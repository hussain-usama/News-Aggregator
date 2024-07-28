import Card from 'react-bootstrap/Card';
import '../styles/cardStyle.css';

import { formatDate } from '../../utils/globalFunctions';
function VerticalCards({ cardContent }) {
    return (
        <Card onClick={()=>window.open(cardContent?.url,'_blank')} >
            <Card.Body>
                <div className="row">
                    <div className='col-md-6'>
                        <Card.Img aria-hidden="true"  src={cardContent?.urlToImage || 'https://placehold.co/300x200.png?text=🍩'} className="vertical-card-images" />
                    </div>
                    <div className='col-md-6'>
                        <div className=''>
                            <Card.Title>{cardContent?.title}</Card.Title>
                            <Card.Text>
                                <div className="d-flex align-items-center  mt-2">
                                    <span>{formatDate(cardContent?.publishedAt)}</span>
                                    <span className="mx-2">•</span>
                                    <span>{cardContent?.author}</span>
                                </div>
                                <p className={"vertical-desc mt-2"}>{cardContent?.description}</p>
                            </Card.Text>

                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

export default VerticalCards;
