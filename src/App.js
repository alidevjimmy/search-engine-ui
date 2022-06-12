import './App.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import Alert from '@mui/material/Alert';

function App() {
  const [searchText, setSearchText] = useState("");
  const [resArr, setResArr] = useState([])
  const [time, setTime] = useState(0)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [searched, setSearched] = useState(false)


  var btnClose = document.getElementById('close-btn');

  function handleSearch(e) {
    setSearchText(e.target.value);
  }


  function handleCloseBtn() {
    setSearchText("");
  }

  function handleSearchBtn() {
    if (searchText.length != 0 && searchText != "") {
      setLoading(true)
      setError(false)
      axios.get(`http://172.17.0.1:5002`)
        .then(res => {
          if (typeof res.data != "undefined") {
            if (typeof res.data.results != "undefined") {
              setResArr(res.data.results)
              setTime(res.data.time)
              setCount(res.data.count)
              if (res.data.results.length == 0) {
                setError(true)
              }
            } else {
              setError(true)
            }
          } else{
            setError(true)
          }
          setLoading(false)
          setSearched(true)
        }).catch(err => {
          setError(true)
          setLoading(false)
          setSearched(true)
        })
    }
  }

  const skls = []
  for (var i = 0; i < 7; i++) {
    skls.push(<div className='grid' key={i}>
      <Skeleton animation="wave" style={{ width: "100px" }} />
      <Skeleton animation="wave" style={{ width: "200px" }} />
      <Skeleton animation="wave" style={{ width: "500px" }} />
      <Skeleton animation="wave" style={{ width: "150px" }} />
    </div>)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="header">
          <div className="logo-box">لوگو</div>
          <div className="search-div">
            <div className="search-box">
              <div className="search-btn"><IconButton color="secondary" aria-label="add an alarm" onClick={handleSearchBtn}><SearchIcon /></IconButton></div>
              <input type="text" placeholder="جستجو" className="search-in" id="search-in" onChange={e => handleSearch(e)} value={searchText} />
              <div className="search-btn close-btn" id="close-btn" onClick={handleCloseBtn}><IconButton color="secondary" aria-label="add an alarm"><CloseIcon /></IconButton></div>
            </div>
          </div>
        </div>
      </header>
      <section className="result">
        {!error ? <div>
          <section className='vision'>
          {loading ? <div>
            <Skeleton animation="wave" className='statistic-skel' />
          </div> : null}
          {loading || error || !searched ? null : <span className='statistic'>حدود {count} نتیجه در {time} ثانیه</span>}
        </section>
        {loading ? <div className='skeleton-div'>
          {skls}
        </div> : null}
        {loading || error ? null : resArr.map((v, k) => (
          <div className="grid" key={k}>
            <div className='grid-url'>{v.url}</div>
            <div className="grid-title"><a href="google.com" className='url'>{v.title}</a></div>
            <div className="grid-summary">{v.summary}</div>
          </div>
        ))}
        </div> : <Alert severity="warning" style={{fontFamily:"IRANSans"}}>نتیجه ای یافت نشد</Alert>}
      </section>
      <footer className='footer'>
        <ul className='footer-ul'>
          <li className='footer-li'>
            <a className='footer-a' href='#'>
              ارتباط با ما
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
