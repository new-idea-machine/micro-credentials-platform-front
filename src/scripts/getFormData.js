function getFormData(formElement) {
  /*
  Convert the values of a form's control elements to a JavaScript object.
  
  "formElement" is the form DOM element to be processed (e.g. the result of a
  "document.getElementById()" or the target of an event).

  All controls in the form that have a name and a value are processed.  This includes (but
  isn't limited to):
  
    <input> (except any whose type is "image" -- they're omitted for historical reasons)
    <output>
    <select>
    <textarea>

  Each control's value is automatically converted to its JavaScript type.  A date or time
  control's corresponding member in the returned object will be a Date object (or "null" if it
  isn't a valid date or time).  A number control's will be a number (possibly "NaN").  A
  multi-select control's will be an array of strings.  A checkbox's will be a boolean.  All
  others' will be strings.
  */

  const formData = {};
  const dateTypes = ["date", "datetime", "datetime-local", "month", "time", "week"];

  for (const control of formElement.elements) {
    if (("name" in control) && (control.name !== "")) {
      if (dateTypes.includes(control.type)) formData[control.name] = control.valueAsDate;
      else if (control.type === "number") formData[control.name] = control.valueAsNumber;
      else if (control.type === "checkbox") formData[control.name] = control.checked;
      else if (control.type === "select-multi") {
        formData[control.name] = [];

        for (const option of control.options)
          if (option.selected) formData[control.name].push(option.value);
      } else if ("value" in control) formData[control.name] = control.value;
    }
  }

  return formData;
}

export { getFormData };
