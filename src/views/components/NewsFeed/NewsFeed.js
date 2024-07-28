import React, { useEffect, useState } from 'react'
import VerticalCards from '../../../components/cards/VerticalCards';
import { categotriesList, getFeeds } from './feedServices';
import CategoryList from '../../../components/categories/CategoryList';
import { formatDate } from '../../../utils/globalFunctions';
import HorizontalCards from '../../../components/cards/HorizontalCards';
import Loader from '../../../components/Loader/Loader';
import '../styles/NewsFeedStyles.css';
import { NEWSORG_KEY } from '../../../config/connectionStrings';

function NewsFeed() {
    const [selectedCategories, setselectedCategories] = useState(['All Categories'])
    const [allFeeds, setAllFeeds] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        callFeedServices()
    }, [])
    /* fetch api response */
    const callFeedServices = async () => {
        setLoading(true)
        const getAllResponses = await Promise.allSettled([getFeeds(`https://newsapi.org/v2/everything?q=all&from=2024-07-27&sortBy=popularity&apiKey=${NEWSORG_KEY}`), getFeeds(`https://content.guardianapis.com/search?api-key=${GUARDIAN_KEY}`)])
        let gatherResponse = [];
        if (getAllResponses.every(x => x.status === "fulfilled")) {
            getAllResponses.forEach(response => {
                if (response?.value?.status === 'ok') {
                    if (response?.value?.articles?.length) {
                        gatherResponse = [...gatherResponse, ...response?.value?.articles]
                    }
                    else if (response?.value?.results?.length) {
                        const formatResponse= response?.value?.results.map(item=>{
                            return {...item ,title:item.pillarName, publishedAt:item.webPublicationDate, description:item.webTitle, url:item.webUrl }
                        })
                        gatherResponse = [...gatherResponse, ...formatResponse]
                    }
                }
            })
        }
        setLoading(false)
        setAllFeeds(gatherResponse)
    }

    /* select category handlers */
    const addCategory = (value) => {
        let updatedCategories = structuredClone(selectedCategories);
        if (value === 'All Categories') {
            if (!updatedCategories.includes('All Categories')) {
                updatedCategories = ['All Categories'];
            }
        } else {
            if (updatedCategories.includes('All Categories')) {
                updatedCategories = updatedCategories.filter(item => item !== 'All Categories');
            }
            const index = updatedCategories.indexOf(value);
            if (index !== -1) {
                updatedCategories.splice(index, 1);
            } else {
                updatedCategories.push(value);
            }
        }
        setselectedCategories(updatedCategories);
        getSpecificFeed(updatedCategories)
    }
    
    /* fetch specifc feed records */
    const getSpecificFeed=async(updatedCategories)=>{
        let specificFeed=[]
        setLoading(true)
        if(updatedCategories.includes('All Categories')){
            specificFeed = await getFeeds(`https://newsapi.org/v2/everything?q=all&from=2024-07-27&sortBy=popularity&apiKey=${NEWSORG_KEY}`)
        }else{
            specificFeed = await fetchAllCategoriesData(updatedCategories)
        }
        setLoading(false)
        setAllFeeds([...specificFeed?.articles]);
    }

    const fetchAllCategoriesData = async (updatedCategories) => {
        try {
            const promises = updatedCategories.map(query=>getFeeds(`https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&from=2024-07-27&sortBy=popularity&pageSize=25&apiKey=${NEWSORG_KEY}`));
            const results = await Promise.all(promises);
            return {articles: results.map(res=>res.articles || [])}
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    
    return (
        <div className=''>
            {loading ? <Loader show={loading} /> : null}
            <div className='row'>
                <div className='col-md-6'>
                    <CategoryList
                        selectedCategories={selectedCategories}
                        categotriesList={categotriesList}
                        addCategory={addCategory}
                    />
                </div>
            </div>
            {allFeeds?.length ? <>
            <div className='row py-4'>
                <div className='col-md-6'>
                    <div className="card-main mt-2" onClick={()=>window.open(allFeeds[0]?.url,'_blank')}>
                        <img src={allFeeds[0]?.urlToImage || 'https://placehold.co/300x200.png?text=🍩'} alt='news-img' className="card-main-image" />
                        <div className="card-gradient"></div>
                        <div className="card-content">
                            <h2 className="shadow-card-title">{allFeeds[0]?.title}</h2>
                            <div className='my-1'>
                                <span className="shadow-card-text">{formatDate(allFeeds[0]?.publishedAt)}</span>
                                <span className="shadow-card-text mx-2">•</span>
                                <span className="shadow-card-text">{allFeeds[0]?.author}</span>
                            </div>
                            <p className="shadow-card-text">{allFeeds[0]?.description}</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    {allFeeds.slice(1, 4).map((item, index) => {
                        return (
                            <div key={index} className='my-2'>
                                <VerticalCards cardContent={item} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='row'>
                {allFeeds.slice(5, allFeeds?.length - 1).map((item, index) => {
                    return (
                        <div className='col-md-4'>
                            <div key={index} className='my-2'>
                                <HorizontalCards cardContent={item} />
                            </div>
                        </div>
                    )
                })}
            </div>
            </> : null}
        </div>
    )
}

export default NewsFeed
