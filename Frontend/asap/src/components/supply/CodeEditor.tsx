import React, { useState } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';

interface ICodeEditor {
  setStore: (value: string) => void; // eslint-disable-line no-unused-vars
}

function CodeEditor({ setStore }: ICodeEditor) {
  const [code, setCode] = useState<string>('');

  const handleEditorChange: OnChange = (value) => {
    setStore(value || '');
    setCode(value || '');
  };

  const editorOptions = {
    minimap: {
      enabled: false,
    },
    scrollBeyondLastLine: false,
  };

  return (
    <Editor
      height="120px"
      language="json"
      value={code}
      onChange={handleEditorChange}
      options={editorOptions}
    />
  );
}

export default CodeEditor;
