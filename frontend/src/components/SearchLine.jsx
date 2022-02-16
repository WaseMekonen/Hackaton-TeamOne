import React, { useState } from 'react';

export default function SearchLine({}) {
    const [search, setSearch] = useState("")

    const arr = [{ busLine: "126" }, { busLine: "6" }, { busLine: "16" }, { busLine: "12" }]

    return (
        <div>
            <input type="text" placeholder='Search...'
                onChange={(e) => setSearch(e.target.value)} />
            <div>
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
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
