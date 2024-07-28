import React from 'react'
import { Button } from 'react-bootstrap'

function CategoryList({selectedCategories,categotriesList,addCategory}) {
    return (
        <div className='d-flex'>
            {categotriesList.map(item => {
                return (
                    <Button
                        onClick={() => addCategory(item)}
                        className='category-selection mx-2'
                        style={{
                            background: selectedCategories.includes(item) ? '#E39652' : 'white',
                            color: selectedCategories.includes(item) ? 'white' : 'black',
                            border: `1px solid ${selectedCategories.includes(item) ? 'transparent' : 'black'} `,
                        }}
                        value={item}>{item}
                    </Button>
                )
            })}
        </div>
    )
}

export default CategoryList
