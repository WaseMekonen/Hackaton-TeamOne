import React, { useState } from 'react';
import { FaAngleDoubleDown, FaPlus, FaSistrix, FaCheck } from "react-icons/fa";

export default function SearchLine({search, setSearch, addToFavorites}) {

    const arr = [{ busLine: "126" }, { busLine: "6" }, { busLine: "16" }, { busLine: "12" }]

    return (
        <div>
            <label><FaSistrix /> </label><input type="text" placeholder='Search...'
                onChange={(e) => setSearch(e.target.value)} />
            <div>
                <br></br>
                {arr.filter(item => {
                    if (search == "") {
                        return item
                    }
                    else if (item.busLine.toLowerCase().includes(search.toLowerCase())) {
                        console.log(item);
                        return item
                    }
                })
                    .map((bus, id) => {
                        return (
                            <div key={id}>
                                <p>{bus.busLine}</p>
                                <button title='add to favorites' onClick={() => {addToFavorites()}}>add</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
