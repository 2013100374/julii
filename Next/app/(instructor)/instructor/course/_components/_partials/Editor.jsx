import Quill from 'quill';
import React, { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css'; // Import Quill's snow theme CSS

const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    
    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div')
      );
      const quill = new Quill(editorContainer, {
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
            [{ 'size': ['small', false, 'large'] }],
            [{ color: [] }, { background: [] }],
            [{ 'align':[] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
          ],
        },
        placeholder: 'Write here...',
        theme: 'snow',
      });

      ref.current = quill;
     
      if (defaultValueRef.current) {
        quill.root.innerHTML = defaultValueRef.current;
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        const content = quill.root.innerHTML; 
        onTextChangeRef.current?.(content, ...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = 'Editor';

export default Editor;
