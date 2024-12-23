import React, { useEffect, useState } from "react";
import "./Header.css";
import FilterWindow from './FilterWindow';
import logoMail from "/src/assets/logoMAIL.jpg";
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import RefreshIcon from '@mui/icons-material/Refresh';
import ProfileMenu from "./ProfileMenu";
import axios from "axios";

const Header = ({searchQuery, setSearchQuery, filterOptions, setFilterOptions, userId, onLogout, activeFolderID, maxPageSize, page, setActiveFolder, setSearching, searching, filtering, setFiltering, setActiveFolde}) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [user, setUser] = useState({ });
  const [initial, setInitial] = useState();
  const [filterWindowOpen, setFilterWindowOpen] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [filterOptions, setFilterOptions] = useState({
  //   datetime: '',
  //   sender: '',
  //   receiver : '',
  //   subject : '',
  //   body : ''
  // });

  const toggleProfileMenu = () => {
    setProfileMenuOpen((prevState) => !prevState);
  };

  const closeProfileMenu = () => {
    setProfileMenuOpen(false);
  };

  useEffect(() => {
    async function fetchUserDetails() {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8080/email/user/${userId}`);
          setUser(response.data);
          setInitial(response.data.username.charAt(0).toUpperCase());
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    }
    fetchUserDetails();
  }, [userId]); // Dependency on userId

  const handleSearchClick = async () => {
    if(searching){setSearching(false)}
    else{setSearching(true);setFiltering(false)}
    console.log(activeFolderID);
    console.log(searchQuery);
    console.log(maxPageSize);
    console.log(page);
    const response = await axios.get(
      `http://localhost:8080/email/searchEmails/${activeFolderID}/${searchQuery}/${maxPageSize}/${page}`
    );
    setActiveFolder(response.data);
  };
  const handleRefreashClick = async () => {
    setSearching(false);
    setFiltering(false);
    const response = await axios.get(
      `http://localhost:8080/email/folders/${activeFolderID}/${maxPageSize}/${page}`);
    setActiveFolder(response.data);
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleFilterClick = () => {
    if(filtering){setFiltering(false);setFilterOptions({
      datetime: '',
      sender: '',
      receiver : '',
      subject : '',
      body : ''
    });return;}
    else{setFiltering(true);setSearching(false)}
    setFilterWindowOpen(true);
  };

  const handleCloseFilterWindow = () => {
    setFilterWindowOpen(false);
  };

  const handleApplyFilter = async (filterOptions) => {
    console.log(filterOptions);
    const response = await axios.post(`http://localhost:8080/email/filterEmails/${activeFolderID}/${"and"}/${maxPageSize}/${page}`,filterOptions);
    setActiveFolder(response.data);
    setFilterWindowOpen(false);
  };
  return (
    <header className="header">
      <div className="header-left">
        <img src={logoMail} alt="Logo" className="logo" />
        <h2>Mail Website</h2>
        <button className="refreash-button" onClick={handleRefreashClick}>
          <RefreshIcon />
        </button>
      </div>
      <div className="header-center">
        <button className="search-button" onClick={handleSearchClick}>
          <SearchIcon />
        </button>
       <input
        type="text"
        className="search-bar"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchInputChange} 
        />
        <button className="filter-button" onClick={handleFilterClick}>
          <TuneIcon />
        </button>
      </div>
      {filterWindowOpen && (
        <FilterWindow
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          onClose={handleCloseFilterWindow}
          onApplyFilter={handleApplyFilter}
        />
      )}
      <div className="header-right">
        {/* <button className="icon-button">
          <i className="material-icons">apps</i>
        </button>
        <button className="icon-button">
          <i className="material-icons">notifications</i>
        </button> */}

        <div className="user-profile" onClick={toggleProfileMenu}>
          {/* <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="user-avatar"
          /> */}
          {initial}
        </div>

        {profileMenuOpen && (
          <ProfileMenu user={user} onLogout={onLogout} closeProfileMenu={closeProfileMenu} />
        )}
      </div>

    </header>
  );
};

export default Header;
