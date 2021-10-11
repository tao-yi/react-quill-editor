import React, { useCallback, useEffect, useState } from 'react'
import Quill, { Sources, TextChangeHandler } from "quill"
import Delta from 'quill-delta'
import "quill/dist/quill.snow.css"

const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]


const TextEditor = () => {
  const [quill, setQuill] = useState<Quill>()

  const wrapperRef = useCallback((wrapper) => {
    if (!wrapper) return
    wrapper.innerHTML = ""
    const editor = document.createElement("div")
    wrapper.append(editor)
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS }
    })
    // q.disable()
    q.setText("Loading...")
    setQuill(q)
  }, [])

  useEffect(() => {
    if (!quill) return
    const handler: TextChangeHandler = (delta: Delta, oldContents: Delta, source: Sources) => {
      console.log(delta);
    }
    quill.on("text-change", handler)
    return () => {
      quill.off("text-change", handler)
    }
  }, [quill])

  return (
    <div className="container" ref={wrapperRef}></div>
  )
}

export default TextEditor
