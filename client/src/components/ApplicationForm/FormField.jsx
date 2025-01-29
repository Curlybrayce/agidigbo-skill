import React from 'react';

const getInputClassName = (showValidation, errors, name, baseStyles = '') => {
  const commonClasses = 'w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent';
  const validationClass = showValidation && errors[name] ? 'border-red-500' : 'border-gray-300';
  return `${commonClasses} ${validationClass} ${baseStyles}`.trim();
};

const FormField = ({
  label,
  name,
  type = 'text',
  required = true,
  options = [],
  onChange,
  errors = {},
  showValidation = false,
  value,
  ...props
}) => {
  const renderInput = () => {
    const commonProps = {
      id: name,
      name,
      onChange,
      value,
      required,
      ...props
    };

    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          className={getInputClassName(showValidation, errors, name)}
          rows="4"
        />
      );
    }

    if (options.length > 0) {
      return (
        <>
          <input
            {...commonProps}
            list={`${name}-options`}
            type={type}
            className={getInputClassName(showValidation, errors, name)}
          />
          <datalist id={`${name}-options`}>
            {options.map((option, index) => (
              <option key={`${name}-option-${index}`} value={option} />
            ))}
          </datalist>
        </>
      );
    }

    return (
      <input
        {...commonProps}
        type={type}
        className={getInputClassName(showValidation, errors, name)}
      />
    );
  };

  return (
    <div className="mb-4">
      <label 
        className="block text-gray-700 text-sm font-medium mb-2" 
        htmlFor={name}
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {renderInput()}
    </div>
  );
};

export default FormField;