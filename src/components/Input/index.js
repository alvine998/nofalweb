import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import React, { useState } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Input = ({ title, value, handleChange, placeholder, name, required, defaultValue, read }) => {
    return (
        <>
            <div style={{ marginTop: 10 }}>
                {
                    title ? <label className='form-label'>{title}</label> : ''
                }
                {
                    defaultValue ?
                        <input className='form-control' readOnly={read ? true : false} defaultValue={defaultValue} required={required} placeholder={placeholder} name={name} onChange={handleChange} />
                        :
                        <input className='form-control' readOnly={read ? true : false} required={required} value={value} placeholder={placeholder} name={name} onChange={handleChange} />
                }
            </div>
        </>
    )
}

const InputArea = ({ title, value, handleChange, placeholder, name, required, defaultValue }) => {
    return (
        <>
            <div style={{ marginTop: 10 }}>
                <label className='form-label'>{title}</label>
                {
                    defaultValue ?
                        <textarea className='form-control' required={required} style={{ height: 200 }} defaultValue={defaultValue} placeholder={placeholder} name={name} onChange={handleChange} />
                        :
                        <textarea className='form-control' required={required} style={{ height: 200 }} value={value} placeholder={placeholder} name={name} onChange={handleChange} />
                }
            </div>
        </>
    )
}

const Select = ({ title, data, handleChange, name, value, required, defaultValue }) => {
    return (
        <>
            <div style={{ marginTop: 10 }}>
                <label className='form-label'>{title}</label>
                {
                    defaultValue ?
                        <select className='form-select' required={required} name={name} onChange={handleChange} defaultValue={defaultValue}>
                            {
                                data?.map((value, i) => <option value={value?.value}>{value?.label}</option>)
                            }
                        </select>
                        :
                        <select className='form-select' required={required} name={name} onChange={handleChange} value={value}>
                            {
                                data?.map((value, i) => <option value={value?.value}>{value?.label}</option>)
                            }
                        </select>
                }
            </div>
        </>
    )
}

const RichText = ({editorState, handleState}) => {
    const wrapperStyle = {
        border: '1px solid #969696',
        borderRadius: 10,
        padding: 10
    }
    const editorStyle = {
        height: '10rem',
        padding: '1rem'
    }

    return (
        <>
            <label className='form-label'>Body</label>
            <Editor
                editorState={editorState}
                wrapperClassName='wrapper-class'
                wrapperStyle={wrapperStyle}
                editorStyle={editorStyle}
                editorClassName="demo-editor"
                toolbar={{
                    options: ['inline', 'blockType', 'fontSize', 'textAlign',
                        'history', 'colorPicker'],
                    inline: {
                        options: ['italic', 'bold'],
                        bold: { className: 'demo-option-custom' },
                        italic: { className: 'demo-option-custom' },
                        underline: { className: 'demo-option-custom' },
                        strikethrough: { className: 'demo-option-custom' },
                        monospace: { className: 'demo-option-custom' },
                        superscript: { className: 'demo-option-custom' },
                        subscript: { className: 'demo-option-custom' }
                    },
                    blockType: {
                        className: 'demo-option-custom-wide',
                        dropdownClassName: 'demo-dropdown-custom'
                    },
                    fontSize: { className: 'demo-option-custom-medium' }
                }}
                onEditorStateChange={handleState}
            />
        </>
    )
}

export { Input, Select, InputArea, RichText }