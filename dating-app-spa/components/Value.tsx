import React from "react";
import axios from "axios";

interface Props {}

interface Value {
  Id: number;
  name: string;
}

const Value = (props: Props) => {
  // const [values, setValues] = React.useState();
  const [values, setValues] = React.useState<Value[]>([]);

  React.useEffect(() => {
    getValues().then((_values: Value[]) => {
      setValues(_values);
    });
  }, []);

  const getValues = async (): Promise<Value[]> => {
    const res = await axios.get("http://localhost:5000/api/values");
    return res.data;
  };

  return (
    <div>
      Values
      {console.log("values = ", values)}
      <ul>
        {values.map((val: Value): any => (
          <li key={val.Id}>{val.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Value;
