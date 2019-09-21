import React, { useState, useEffect } from 'react';
import './App.css';
import data from './data/data.json';
import Sidebar from './components/Sidebar/Sidebar'
import Content from './components/Content/Content'


function App() {
    const [newData, handleNewData] = useState(data)
    const [selectedParagraphIndex, handleSelectedParagraphIndex] = useState(0)
    const [textInitialIndex, handleTextInitialIndex] = useState(0)
    const [textLastIndex, handleTextLastIndex] = useState(5)
    const [isDataSaved, handleIsDataSaved] = useState(false)

    useEffect(() => {
        paragraph = `${newData[selectedParagraphIndex].prev_text} ${newData[selectedParagraphIndex].text} ${newData[selectedParagraphIndex].next_text}`
        splitText = newData[selectedParagraphIndex].text.split(" ")
        stringArray = paragraph.split(" ")
        handleTextInitialIndex(stringArray.findIndex((val, index) => (val === splitText[0]) ? index : 0))
        handleTextLastIndex(stringArray.findIndex((val, index) => (val === splitText[splitText.length - 1]) ? index : 0))
    }, [selectedParagraphIndex])

    let paragraph = `${newData[selectedParagraphIndex].prev_text} ${newData[selectedParagraphIndex].text} ${newData[selectedParagraphIndex].next_text}`,
        splitText = newData[selectedParagraphIndex].text.split(" "),
        stringArray = paragraph.split(" ");
    let outputData = [];
    const handleSaveData = () => {
        outputData = [];
        for(let i=0; i<newData.length; i++) {
            outputData.push(
                <tr>
                    <td>newData[i].Id</td>
                    <td>newData[i].prev_text</td>
                    <td>newData[i].text</td>
                    <td>newData[i].next_text</td>
                    <td>newData[i].label</td>
                </tr>
            )
            if(!newData[i].label) {
                return alert("Please Select Labels for all Paragraphs.")
            }   else if(i === newData.length - 1) {
                handleIsDataSaved(true)
                // alert("Data Saved Successfully")
            }
        }
    }

    return (
        <div className="App">
            <header className="App-Header"><h4>- Assignment by Ayushi Sharma</h4></header>
            <div className={`App-Main ${isDataSaved ? 'NoDisplay' : ''}`}>
                <Sidebar
                    data={newData}
                    index={selectedParagraphIndex}
                    changeParagraph={index => handleSelectedParagraphIndex(index)}/>
                <Content
                    data={newData}
                    paragraph={paragraph}
                    textInitialIndex={textInitialIndex}
                    textLastIndex={textLastIndex}
                    handleTextInitialIndex={index => handleTextInitialIndex(index)}
                    handleTextLastIndex={index => handleTextLastIndex(index)}
                    index={selectedParagraphIndex}
                    modifyData={data => handleNewData(data)}
                    changeParagraph={index => handleSelectedParagraphIndex(index)}/>
            </div>
            <footer className={`App-Footer ${isDataSaved ? 'NoDisplay' : ''}`}><button className="App-Footer--button" onClick={handleSaveData}>Save Data</button></footer>
            <table className={`Output ${isDataSaved ? 'showData' : ''}`}>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Prev Text</td>
                        <td>Text</td>
                        <td>Next Text</td>
                        <td>Label</td>
                    </tr>
                </thead>
                <tbody>
                    {outputData}
                </tbody>
            </table>
        </div>
    );
}

export default App;
