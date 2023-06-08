import { Input, TextArea } from '../atoms';

const InputBox = ({ type, onChange }) => {
  const displayPanelType = (type) => {
    switch (type) {
      case 'text':
        return (
          <TextArea
            // type="text"
            placeholder="Text (optional)"
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        );
      case 'visual':
        return (
          <Input
            onChange={(e) => {
              onChange(e.target.value);
            }}
          />
        );
      case 'link':
        return (
          <TextArea
            // type="text"
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
