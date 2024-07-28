import Card from 'react-bootstrap/Card';
import { formatDate } from '../../utils/globalFunctions';

function HorizontalCards({cardContent}) {
    return (
        <Card onClick={()=>window.open(cardContent?.url,'_blank')} >
            <div className="bg-pink-200 p-4">
                <Card.Img aria-hidden="true"  src={cardContent?.urlToImage ||  'https://placehold.co/300x200.png?text=🍩' } className='horizontal-card-images' />
            </div>
            <Card.Body>
                <Card.Title>{cardContent?.title}</Card.Title>
                <Card.Text>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                        <span>{formatDate(cardContent?.publishedAt)}</span>
                        <span className="mx-2">•</span>
                        <span>{cardContent?.author}</span>
                    </div>
                    <p className={"vertical-desc mt-2"}>
                        {cardContent?.description}
                    </p>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default HorizontalCards;
