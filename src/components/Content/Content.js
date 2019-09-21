import React, { useState, useEffect } from 'react'
import './Content.css'
import Select from 'react-select'
import options from '../../data/Labels'

const Content = ({data, paragraph, index, changeParagraph, textInitialIndex, textLastIndex, handleTextInitialIndex, handleTextLastIndex, modifyData}) => {
    const [selectedLabelOption, handleSelectedLabelOption] = useState(options.find(val => val.value === data[index].label) || '')

    useEffect(() => {
        handleSelectedLabelOption(options.find(val => val.value === data[index].label) || '')
    }, [index])

    let stringArray = paragraph.split(" ");
    let formattedParagraph = stringArray.map((val, paragraphIndex) => (
            <div className={`${paragraphIndex >= textInitialIndex && paragraphIndex <= textLastIndex ? 'Paragraph-words--Highlighted' : ''} Paragraph-words`}
                key={paragraphIndex}
                onClick={() => handleWordClick(paragraphIndex)}>
                {val + " "}
            </div>)
        ),
        component = (
            <div className="TextArea-container">
                <div className="Paragraph">
                    {formattedParagraph}
                </div>
            </div>);
    const handleWordClick = (paragraphIndex) => {
        let median = (textInitialIndex + textLastIndex) / 2,
            newData = data;
        if(paragraphIndex < median) {
            newData[index].prev_text = [...stringArray].slice(0, paragraphIndex).join(' ')
            newData[index].text = [...stringArray].slice(paragraphIndex, textLastIndex + 1).join(' ')
            modifyData(newData)
            handleTextInitialIndex(paragraphIndex)
        } else {
            newData[index].next_text = [...stringArray].slice(paragraphIndex + 1, [...stringArray].length).join(' ')
            newData[index].text = [...stringArray].slice(textInitialIndex, paragraphIndex + 1).join(' ')
            modifyData(newData)
            handleTextLastIndex(paragraphIndex)
        }
    }
    const handleLabelChange = (val) => {
        let newData = data;
        newData[index].label = val.value
        modifyData(newData)
        handleSelectedLabelOption(val)
    }
    return (
        <div className="Content">
            <div className="Label-selection">
                <label className="Label">Select Label for Selected text</label>
                <Select
                    className="Label-Select"
                    value={selectedLabelOption}
                    onChange={(val) => handleLabelChange(val)}
                    options={options}
                />
            </div>
            <section className="Content-main">
                {component}
            </section>

            <div className="Button--container">
                <button className="Previous-button" onClick={() => changeParagraph(index - 1)} disabled={index < 1}> &lt; Previous Paragraph </button>
                <button className="Next-button" onClick={() => changeParagraph(index + 1)} disabled={index === data.length - 1}>Next Paragraph &gt;</button>
            </div>
        </div>
    )
}

export default Content