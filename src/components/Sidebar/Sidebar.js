import React, { useState, useEffect } from 'react';
import './Sidebar.css'

const Sidebar = ({data, index, changeParagraph}) => {
    let list = [];
    for(let i=0; i < data.length; i++) {
        list.push(
            <div key={i}
                className={`SidebarList-item ${i === index ? 'SidebarList-item--Highlighted' : ''}`}
                onClick={() => changeParagraph(i)}>
                <h3>Paragraph {i + 1}</h3>
                {data[i].text}
            </div>
        )
    }
    return (
        <div className="Sidebar">
            {list}
        </div>
    )
}

export default Sidebar