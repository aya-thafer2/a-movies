import React from 'react'

const CustomInput = ( {text, type, name, onChange, error} ) => {
  return (
    <>
      <input
        onChange={onChange}
        className="form-control mt-4"
        placeholder={text}
        type={type}
        name={name}
      />

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
    </>
  );
}

export default CustomInput