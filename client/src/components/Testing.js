import React from 'react';
import { useState } from 'react';

function Testing() {

    const [values, setValues] = useState({ val: []});

      function createInputs() {
        return values.val.map((el, i) =>
          <div key={i}>
            <input type="text" value={el||''} onChange={handleChange.bind(i)} />
            <input type='button' value='remove' onClick={removeClick.bind(i)} />
          </div>
        );
      }

    function handleChange(event) {
      let vals = [...values.val];
      vals[this] = event.target.value;
      setValues({ val: vals });
    }

    const addClick = () => {
      setValues({ val: [...values.val, '']})
    }

    const removeClick = () => {
      let vals = [...values.val];
      vals.splice(this,1);
      setValues({ val: vals });
    }

    const handleSubmit = event => {
      alert('A name was submitted: ' + values.val.join(', '));
      event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            {createInputs()}
            <input type='button' value='add more' onClick={addClick} />
            <input type="submit" value="Submit" />
        </form>
      );
  
  }
  
  export default Testing;