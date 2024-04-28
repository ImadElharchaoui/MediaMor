import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccountCard from './AccountCard';

const FollowersController = (props) => {
    const AccountId = props.AccountId;
    const [followerData, setFollowerData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5555/follower/followers', { userId: AccountId });
                setFollowerData(response.data.results);
                console.log("followdata", followerData);
            } catch (error) {
                console.error('Error fetching follower data:', error);
            }
        };

        fetchData();
    }, [AccountId]);

    return (
        <div className='p-2 grid grid-cols-4 gap-4'>
            {followerData.map((follower) => (
                <div className=''>
                    <AccountCard key={follower.follower} time={follower.timeMake} AccountId={follower.follower} />
                </div>
            ))}
        </div>
    );
};

export default FollowersController;
