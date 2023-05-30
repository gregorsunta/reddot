const InputBox = ({ type, onChange }) => {
  const displayPanelType = (type) => {
    switch (type) {
      case 'text':
        return (
          <textarea
            type="text"
            placeholder="Text (optional)"
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        );
      case 'visual':
        return (
          <input
            onChange={(e) => {
              onChange(e.target.value);
            }}
          ></input>
        );
      case 'link':
        return (
          <textarea
            type="text"
            placeholder="Url"
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        );
      default:
        console.error(`The entered panel type (${type}) is invalid.`);
    }
  };

  return displayPanelType(type);
};

export { InputBox };
