import React, { Fragment } from 'react'
import { unMountModal } from '@components/ModalBox/utils'
import ModalHeader from '@components/ModalBox/ModalHeader'
import ModalFooter from '@components/ModalBox/ModalFooter'
import ModalBody from '@components/ModalBox/ModalBody'
import ModalBox from '@components/ModalBox'
import { GET, POST } from '@utils/fetch'
import Search from '@components/SearchInput'
import '@sass/OrdersPage/ShowNotified.scss'
import '@sass/components/_spinner.scss'
import { getIcon } from './../utils'

export default function showCatalogue(data) {
  return class ShowCatalogue extends React.Component {
    constructor() {
      super()
      this.shortNamesMap = {}
      this.skus = []
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

    setActiveAccordian(i, genreShortName, brandName) {
      if (this.state.activeAccordian === i) {
        this.setState({
          isAccordianOpen: false,
          activeAccordian: -1
        })
      } else {
        this.setState({
          activeAccordian: i,
          isAccordianOpen: true,
          loadingSKU: true
        })
        this.listSKUUsingBrand(genreShortName, brandName)
      }

      // this.listSKUUsingBrand(this.brands[i].shortName)
    }

    listSKUUsingBrand(genreShortName, brandName) {
      POST({
        api: `/support/browse/stores/${genreShortName}/${brandName}`,
        handleError: true,
        apiBase: 'catman',
        data: {
          from: 0,
          size: 9999,
          km: '40km',
          gps: data.gps,
          is_featured: false,
          stateName: 'TN'
        }
      })
        .then(json => {
          let id
          let type
          let cashbackTitle
          this.skus = json.brand.skus.map(item => {
            id = item.offer ? item.offer.cash_back_offer_id : item.sku_pricing_id
            type = item.offer ? 'cashback' : 'normal'
            cashbackTitle = item.offer ? item.offer.title : ''
            return {
              id,
              volume: item.volume,
              price: item.price,
              type,
              cashbackTitle
            }
          })
          this.setState({ loadingSKU: false })
        })
    }

    listBrandsUsingGenre(genre) {
      POST({
        api: `/support/browse/genre/${genre}`,
        handleError: true,
        apiBase: 'catman',
        data: {
          from: 0,
          size: 9999,
          km: '40km',
          gps: data.gps,
          is_featured: false,
          stateName: 'TN'
        }
      })
        .then(json => {
          this.brands = json.map(item => {
            return {
              id: item.id,
              brand: item.brand_name,
              shortName: item.brand_short_name,
              genreShortName: item.genre_short_name
            }
          })
          this.setState({ loadingBrands: false })
        })
    }

    listGenres() {
      POST({
        api: '/support/browse/stores',
        handleError: true,
        apiBase: 'catman',
        data: {
          gps: data.gps
        }
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

    addItemToCart(item, brand) {
      data.addItemToCart(item, brand)
      // unMountModal()
    }

    searchBrands(searchText) {
      this.setState({ loadingBrands: true, isAccordianOpen: false, activeAccordian: -1 })
      if (searchText.length) {
        POST({
          api: '/consumer/browse/search',
          handleError: true,
          apiBase: 'blogicUrl',
          data: {
            searchText,
            km: '40km',
            gps: data.gps,
            is_featured: false,
            stateName: 'TN'
          }
        })
          .then(json => {
            this.brands = json.brands.map(item => {
              return {
                id: item.id,
                brand: item.brand_name,
                shortName: item.short_name,
                genreShortName: item.category.genre_short.short_name
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
        <React.Fragment>
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
                          {item.genre}
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
                      this.brands.map((item, i) => {
                        return <Fragment key={item.id}>
                          <tr
                            onClick={() => { this.setActiveAccordian(i, item.genreShortName, item.shortName) }}
                            style={{ cursor: 'pointer' }} key={i}
                          >
                            <td>{item.brand}</td>
                            <td style={{ textAlign: 'center' }}>{getIcon('down-arrow')}</td>
                          </tr>
                          {
                            this.state.isAccordianOpen && i === this.state.activeAccordian &&
                            <tr className='accordian-row'>
                              <td>
                                <table>
                                  {/* <thead>
                                    <tr>
                                      <th>Volume</th>
                                      <th>Price</th>
                                      <th></th>
                                    </tr>
                                  </thead> */}
                                  <tbody>
                                    {
                                      !this.state.loadingSKU ? (
                                        this.skus.map(item => {
                                          const newItem = Object.assign({}, item)
                                          newItem.brand = this.brands[i].brand
                                          return <tr key={item.id}>
                                            <td>
                                              {`${item.volume} ml`}
                                              <br />
                                              <span
                                                style={{
                                                  fontStyle: 'italic',
                                                  color: '#ff3b34',
                                                  fontSize: '14px'
                                                }}
                                              >
                                                {item.cashbackTitle}
                                              </span>
                                            </td>
                                            <td>{item.price}</td>
                                            <td>
                                              <button
                                                onClick={() => { this.addItemToCart(newItem) }}
                                                style={{
                                                  padding: '2px 20px'
                                                }}
                                              >
                                                add
                                              </button>
                                            </td>
                                          </tr>
                                        })
                                      )
                                        : <div className='rolling-loader'></div>
                                    }
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          }
                        </Fragment>
                      })
                    }
                  </tbody>
                </table>
              }
            </ModalBody>
            <ModalFooter>
              <button className='btn btn-primary' onClick={unMountModal}>Close</button>
            </ModalFooter>
          </ModalBox>

        </React.Fragment>
      )
    }
  }
}
