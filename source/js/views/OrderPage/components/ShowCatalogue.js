import React, { Fragment } from 'react'
import { unMountModal } from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { GET, POST } from '@utils/fetch'
import Search from '@components/SearchInput'
import '@sass/OrdersPage/ShowNotified.scss'
import { getIcon } from './../utils'

export default function showCatalogue(data) {
  return class ShowCatalogue extends React.Component {
    constructor() {
      super()
      this.shortNamesMap = {}
      this.state = {
        genre: 'Beer',
        genreShortName: 'beer',
        isAccordianOpen: false,
        activeAccordian: -1,
        loadingGenres: true,
        loadingBrands: true,
        loadingSKU: true,
        searchQuery: ''
      }
      this.handleChange = this.handleChange.bind(this)
      this.setActiveAccordian = this.setActiveAccordian.bind(this)
      this.listGenres = this.listGenres.bind(this)
      this.listBrandsUsingGenre = this.listBrandsUsingGenre.bind(this)
      this.listSKUUsingBrand = this.listSKUUsingBrand.bind(this)
      this.searchBrands = this.searchBrands.bind(this)
      this.setSearchQuery = this.setSearchQuery.bind(this)
    }

    componentDidMount() {
      this.listGenres()
      this.listBrandsUsingGenre('beer')
    }

    setActiveAccordian(i) {
      if (this.state.activeAccordian === i) {
        this.setState({
          isAccordianOpen: false,
          activeAccordian: -1
        })
      } else {
        this.setState({
          activeAccordian: i,
          isAccordianOpen: true
        })
      }
      this.listSKUUsingBrand('budweiser-pint')
    }

    listSKUUsingBrand(brand) {
      POST({
        api: `/consumer/browse/stores/${this.state.genreShortName}/${brand}`,
        handleError: true,
        apiBase: 'gremlinUrl',
        data: {
          from: 0,
          size: 9999,
          km: '40km',
          gps: '12.9705214,77.5794326',
          is_featured: false,
          stateName: 'KA'
        }
      })
      .then(json => {
        this.brands = json.brands.map(item => {
          return {
            id: item.id,
            brand: item.brand_name
          }
        })
        this.setState({ loadingSKU: false })
      })
    }

    listBrandsUsingGenre(genre) {
      POST({
        api: `/consumer/browse/stores/${genre}`,
        handleError: true,
        apiBase: 'gremlinUrl',
        data: {
          from: 0,
          size: 9999,
          km: '40km',
          gps: '12.9705214,77.5794326',
          is_featured: false,
          stateName: 'KA'
        }
      })
      .then(json => {
        this.brands = json.brands.map(item => {
          return {
            id: item.id,
            brand: item.brand_name
          }
        })
        this.setState({ loadingBrands: false })
      })
    }

    listGenres() {
      GET({
        api: '/consumer/browse/stores',
        handleError: true,
        apiBase: 'gremlinUrl'
      })
      .then(json => {
        this.genres = json.data.map(item => {
          this.shortNamesMap[item.genre_name] = item.short_name
          return {
            id: item.id,
            genre: item.genre_name
          }
        })
        this.setState({ loadingGenres: false })
      })
    }

    addItemToCart() {
      POST({
        api: '/support/cart/add/',
        handleError: true,
        apiBase: 'orderman',
        data: {
          delivery_cart_id: data.id,
          type: 'normal',
          product_id: null
        }
      })
      .then(json => json)
    }

    searchBrands(searchText) {
      this.setState({ loadingBrands: true })
      if (searchText.length) {
        POST({
          api: '/consumer/browse/search',
          handleError: true,
          apiBase: 'blogicUrl',
          data: {
            searchText,
            km: '40km',
            gps: '12.9705214,77.5794326',
            is_featured: false,
            stateName: 'KA'
          }
        })
        .then(json => {
          this.brands = json.brands.map(item => {
            return {
              id: item.id,
              brand: item.brand_name
            }
          })
          this.setState({ loadingBrands: false })
        })
      } else {
        this.listBrandsUsingGenre(this.state.genreShortName)
      }
    }

    handleChange(e) {
      const genreShortName = this.shortNamesMap[e.target.value]
      this.setState({ genre: e.target.value, genreShortName, loadingBrands: true })
      this.listBrandsUsingGenre(genreShortName)
    }

    setSearchQuery(searchQuery) {
      this.setState({ searchQuery })
    }

    render() {
      return (
        <ModalBox>
          <ModalHeader>Browse Catalogue</ModalHeader>
          <div style={{ display: 'flex', margin: '20px 0' }}>
            {
              !this.state.loadingGenres &&
              <Fragment>
                <select
                  style={{ marginRight: '20px' }}
                  value={this.state.genre}
                  onChange={this.handleChange}
                >
                  {
                    this.genres.map(item => (
                      <option
                        key={item.id}>
                        { item.genre }
                      </option>
                    ))
                  }
                </select>
                <Search
                  placeholder='Search for brands..'
                  search={this.searchBrands}
                  setSearchQuery={this.setSearchQuery}
                  searchQuery={this.state.searchQuery}
                />
              </Fragment>
            }
          </div>
          <ModalBody height='560px'>
            {
              !this.state.loadingGenres && !this.state.loadingBrands &&
              <table className='table--hovered'>
                <thead>
                  <tr>
                    <td>Brand name</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.brands.map((item, i) => (
                      <Fragment key={item.id}>
                        <tr
                          onClick={() => { this.setActiveAccordian(i) }}
                          style={{ cursor: 'pointer' }} key={ i }
                        >
                          <td>{item.brand}</td>
                          <td style={{ textAlign: 'center' }}>{ getIcon('down-arrow')}</td>
                        </tr>
                        {
                          this.state.isAccordianOpen && i === this.state.activeAccordian &&
                            <tr className='accordian-row'>
                              <td>
                                <table>
                                  <tbody>
                                    {
                                      [1, 2, 3].map(item => (
                                        <tr>
                                          <td>750 ml</td>
                                          <td>
                                            <button
                                              onClick={() => { this.addItemToCart(item.id) }}
                                              style={{
                                                padding: '2px 20px'
                                              }}
                                            >
                                              add
                                            </button>
                                          </td>
                                        </tr>
                                      ))
                                    }
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                        }
                      </Fragment>
                    ))
                  }
                </tbody>
              </table>
            }
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-primary' onClick={unMountModal}>Close</button>
          </ModalFooter>
        </ModalBox>
      )
    }
  }
}