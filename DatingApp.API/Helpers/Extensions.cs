using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }

        public static int CalculateAge(this DateTime theDateTime)
        {
            var todaysYear = DateTime.Today.Year; // 2020
            var argDatesYear = theDateTime.Year; // 1994
            var age = todaysYear - argDatesYear; // 26
            var addedYears = theDateTime.AddYears(age); // totan num of milliseconds for all those years 637,178,400
            var today = DateTime.Today; // 637,257,024
            // If number of milliseconds the all the years difference is more than 
            // num of milliseconds of today - meaning that the birthday is sometimes this year but it didn't happen yet
            // Then subtract one year because the person didn't yet have his/her birthday this year
            if (addedYears > today) age--;
            return age;
        }
    }
}