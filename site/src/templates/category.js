import * as React from "react"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import { Link, graphql } from "gatsby"
import CATEGORIES from "../data/categories.json"
import SingleHero from "../components/SingleHero";
import Tabs from "../components/Tabs";
import CategoryList from "../components/CategoriesList";
import Card from "../../../gatsby-theme/src/components/Card";

export const query = graphql`
    query AllCategoryBooks($skip: Int!, $limit: Int!, $category: String) {
        allBook(sort: {ratingsCount: DESC}, limit: $limit, skip: $skip, filter: {categories: {eq: $category}}) {
            nodes {
                title
                categories
                averageRating
                ratingsCount
                description
                id
                slug
                cover {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
                authors {
                    slug
                    name
                }
            }
        }
    }
`

export default function BookPage({data, pageContext, location}){
    const {numPagesPerCat, currentPage, category} = pageContext
    const {allBook} = data

    React.useEffect(() => {
        // console.log(numPagesPerCat)
    }, [])

    return (
        <>
            <SingleHero>Browse categories</SingleHero>
            <Tabs list={CATEGORIES.data} pathname={location.pathname} />
            <CategoryList>
                {
                    allBook.nodes.map(book => (
                        <Card roundedCorners={false} book={book} hasImageDisplacement={false} image={<GatsbyImage image={getImage(book.cover)} width={128} height={192} alt={book.title} layout="fullWidth" />} />
                    ))
                }
            </CategoryList>

            <div>
                {
                    Array.from({length: numPagesPerCat}).map((_, i) => (
                        <Link key={i + 1} to={i === 0 ? `${location.origin}/categories/${category.toLowerCase()}` : `${i + 1}`}><button>{i + 1}</button></Link>
                    ))
                }
            </div>
        </>
    )
}