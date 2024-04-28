import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const Info = (props) => {
    const AccountId = props.AccountId;
    const [accountData, setAccountData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(`http://localhost:5555/user/info/${AccountId}`);
                setAccountData(response.data.info);
            } catch (error) {
                console.error('Error fetching account info:', error);
            }
        };
        fetchData();
    }, [AccountId]);

    return (
        <div className='h-full bg-white mt-8'>
            <div className='p-8'>
                <div className='mb-4'>
                    <label className='font-bold mr-2'>Full Name:</label>
                    <span>{accountData.username}</span>
                </div>
                <div className='mb-4'>
                    <label className='font-bold mr-2'>Bio:</label>
                    <span>{accountData.bio}</span>
                </div>
                <div className='mb-4'>
                    <label className='font-bold mr-2'>Posts:</label>
                    <span>{accountData.Nposts}</span>
                </div>
                <div className='mb-4'>
                    <label className='font-bold mr-2'>Comments:</label>
                    <span>{accountData.Ncomments}</span>
                </div>
                <div className='mb-4'>
                    <label className='font-bold mr-2'>Followers:</label>
                    <span>{accountData.Nfollowing}</span>
                </div>
                <div className='mb-4'>
                    <label className='font-bold mr-2'>Following:</label>
                    <span>{accountData.Nfollowers}</span>
                </div>
                <div className='mb-4'>
                    <label className='font-bold mr-2'>Joined since:</label>
                    <span>{accountData.time && (accountData.time).slice(0,10)} from {accountData.time && moment(accountData.time.slice(0,10), "YYYY-MM-DD HH:mm:ss").fromNow()}</span>
                </div>
            </div>
        </div>
    );
};

export default Info;
