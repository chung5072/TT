import React from "react"
import './pagination.css'

export default function Pagination() {
    return (
        <div className="page">
            <ul>
                <li><a href="#" className="first">first page</a></li>
                <li><a href="#" className="arrow-left">&lt;&lt;</a></li>
                <li><a href="#" className="num">1</a></li>
                <li><a href="#" className="num">2</a></li>
                <li><a href="#" className="num">3</a></li>
                <li><a href="#" className="num">4</a></li>
                <li><a href="#" className="num">5</a></li>
                <li><a href="#" className="num">6</a></li>
                <li><a href="#" className="num">7</a></li>
                <li><a href="#" className="num">8</a></li>
                <li><a href="#" className="num">9</a></li>
                <li><a href="#" className="arrow-right">&gt;&gt;</a></li>
                <li><a href="#" className="last">last page</a></li>
            </ul>
        </div>
    )
}