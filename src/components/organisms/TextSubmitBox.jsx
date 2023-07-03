import { useState } from 'react';
import { Button, TextArea } from '../atoms';
import { Stack } from '../atoms';

const TextSubmitBox = ({
  className,
  textPlaceholder = 'What are your thoughts?',
  submitButtonName = 'Submit',
  onChange,
  onSubmit,
}) => {
  return (
    <Stack className={className}>
      <TextArea
        placeholder={textPlaceholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <Button variant="solid" width={'min-content'} onClick={onSubmit}>
        {submitButtonName}
      </Button>
    </Stack>
  );
};

export { TextSubmitBox };
