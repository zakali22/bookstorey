import * as React from "react"
import CATEGORIES from "../data/categories.json"

export default function IndexPage() {
  const [books, setBooks] = React.useState([])

  React.useEffect(() => {
    const data = fetchData()

    // console.log(data)
  }, [])


  
  function fetchData(){
    return CATEGORIES.data.map(category => {
        fetchBooks(category).then(books => {
          // console.log(category, books)
            if(books && books.length){
                const booksDetails = books.map(({volumeInfo}) => {
                    return {
                        ratingsCount: volumeInfo.ratingsCount ? volumeInfo.ratingsCount : 0,
                        averageRating: volumeInfo.averageRating ? volumeInfo.averageRating : 1,
                        buyLink: volumeInfo.buyLink !== undefined && volumeInfo.buyLink,
                        authors: volumeInfo.authors !== undefined && volumeInfo.authors,
                        categories: [category.charAt(0).toUpperCase() + category.slice(1)],
                        description: volumeInfo.description,
                        imageLinks: volumeInfo.imageLinks,
                        infoLink: volumeInfo.infoLink,
                        pageCount: volumeInfo.pageCount,
                        publishedDate: volumeInfo.publishedDate,
                        publisher: volumeInfo.publisher,
                        title: volumeInfo.title
                    }
                })

                // console.log(booksDetails)
                return booksDetails
            }
        })
    })
  }

  async function fetchBooks(category){
    const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&startIndex=6&maxResults=16&key=AIzaSyDBwmLxRKYxsx8kMWIwJf8Yuplm8NC2zpo`).then((res) => res.json())
    if(!res.items) return
    return res.items
  }

  return (
    <>
      <h2>Homepage</h2>
    </>
  )
}

