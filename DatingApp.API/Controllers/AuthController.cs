using Microsoft.AspNetCore.Mvc;
using DatingApp.API.Data;
using DatingApp.API.Models;
using DatingApp.API.Dtos;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using AutoMapper;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo; // repository layer
        private readonly IConfiguration _config; // values from appsettings.json
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            // Initializing repo will expose the repository layer to this controller
            _repo = repo;
            // Initializing config will allow this controller to get values from appsettings.json
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest(new { message = "Username already exists." });

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailsDto>(createdUser);

            // return StatusCode(201);
            return CreatedAtRoute("GetUser", new { controller = "Users", id = createdUser.Id }, userToReturn);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            // throw new Exception("Computer says no!");
            // Invoke repository's Login method and get back the user from repository
            // making sure that username and password that user provided match whatever is stored for that user in the DB
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            // If user doesn't exist - respond with 401
            if (userFromRepo == null) return Unauthorized();

            // Build JWT tokey that will be returned to the user
            // Add user ID and username to the token to save a DB call when the token gets back to the server (JWT payload)
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            // Get secret token from appsettings.json -> AppSettings -> Token
            var secretKey = _config.GetSection("AppSettings:Token").Value;
            // Encode string with ASCI char codes (e.g. a -> 97, etc)
            var encodedSecretKey = Encoding.UTF8.GetBytes(secretKey);

            // Build hashed key for JWT signature, using secret token stored in appsettings.json
            var key = new SymmetricSecurityKey(encodedSecretKey);

            // Generate signing credentials based on key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // Put JWT stuff together by combining claims, expiry date for token, and signing credentials into descriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            // Initializing and using token handler - create a token and pass in token descriptor
            var tokenHandler = new JwtSecurityTokenHandler();

            // Create token - it will contain JWT token that gets returned to client
            SecurityToken token;
            try
            {
                token = tokenHandler.CreateToken(tokenDescriptor);
            }
            catch (System.Exception)
            {
                throw new Exception("Security keys did not match.");
            }

            var user = _mapper.Map<UserForDetailsDto>(userFromRepo);

            // Return token to client in a form of a new object, usign WriteToken method to write token to response
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user
            });
        }
    }
}

/*
LOGIN logic

    1) Add Microsoft.IdentityModel.Tokens and System.IdentityModel.Tokens.Jwt nuget packages;
    2) Create a DTO for those fields that are coming from JSON body - UserForLoginDto;
    3) Invoke Login() method from repository - _repo.Login(...), and get user back;
        i) ...making sure that username and password that user provided match whatever is stored for that user in the DB;
    4) Build JWT tokey that will be returned to the user;
    5) Add user ID and username to the token to save a DB call when the token gets back to the server;
    6) Build hashed key for JWT signature, using secret token stored in appsettings.json;
        i) Get secret token string from appsettings.json -> AppSettings -> Token
        i) Encode token string with ASCI char codes (e.g. a -> 97, etc);
    7) Generate signing credentials based on key;
    8) Put JWT stuff together by combining claims, expiry date for token, and signing credentials into descriptor;
        i) Claims go under Subject, and Expires will consist of current day, using AddDays method - DateTime.Now.AddDays(1);
    9) Initializing and using token handler - create a token and pass in token descriptor;
    10) Create token - it will contain JWT token that gets returned to client;
    11) Return token to client in a form of a new object, usign WriteToken() serializing method to write token to HTTP response.
*/

/*
AUTHORIZARION

    1) Add Microsoft.AspNetCore.Authentication.JwtBearer package;

*/
