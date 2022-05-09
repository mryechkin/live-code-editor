import React, { useEffect, useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import copy from 'copy-to-clipboard';
import * as Chakra from '@chakra-ui/react';

import theme from 'prism-react-renderer/themes/vsDark';

const scope = {
  ...React,
  ...Chakra,
};

export default function CodeBlock({ code, noInline }) {
  const [copied, setCopied] = useState(false);
  const [editorCode, setEditorCode] = useState(code);

  useEffect(() => {
    if (copied && editorCode) copy(editorCode);

    const timeoutId = setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [copied]);

  const handleOnChange = (newCode) => setEditorCode(newCode);

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <LiveProvider
        code={editorCode}
        theme={theme}
        scope={scope}
        noInline={noInline}
      >
        <LivePreview className="w-full border border-gray-300 rounded-md p-2" />
        <div className="p-2 relative w-full mt-4 flex flex-col items-center justify-center rounded-md bg-[#1E1E1E]">
          <button
            onClick={() => setCopied(true)}
            className="focus:outline-none focus:ring focus:border-sky-500 bg-teal-600 absolute top-3 right-3 font-bold rounded-md text-xs uppercase text-white py-1 px-3 hover:bg-teal-700"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
          <div className="text-xs uppercase text-gray-400 font-bold">
            Editable Example
          </div>
          <LiveEditor onChange={handleOnChange} className="p-2 w-full" />
        </div>
        <LiveError className="mt-4 bg-red-600 text-white p-2 w-full" />
      </LiveProvider>
    </div>
  );
}
