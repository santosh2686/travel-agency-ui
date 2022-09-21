// GitHub repository

const path = require('path')
const express = require('express')
const compression = require('compression')
const proxyMiddleware = require('http-proxy-middleware')

const app = express()
const port = process.env.PORT || 6060
const apiEndPoint = 'https://hungry-bee-cuff.cyclic.app'

app.use(compression())
/*
app.use((req, res, next) => {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`)
  next()
})

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
  index: ['index.html'],
  maxAge: '1m',
  redirect: false,
}
app.use(express.static('public', options))
*/

app.use(express.static(`${__dirname}/public`))

app.use('/api/**', proxyMiddleware({
  target: apiEndPoint,
  changeOrigin: true,
  pathRewrite: {
    '^/api/': '/',
  },
  onProxyReq: (proxyReq, req) => {
    console.log(req.method, req.path, '->', apiEndPoint + proxyReq.path)
  },
}))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
  console.log(`Application Running on port: ${port}`)
})

/*
  Remove request categories (regular/fixed), hard code the categories
  Vehicle monthly or no
  Datepicker input format change to formatDate util function
  Do not delete or edit own vehicle and vehicle and driver expense
  Do not fetch the records after delete, delete it from the redux store for non-pagination
  notification for advanced bookings
  Save contact and email ids of all the existing as well as new customer for we can send them
  newsletters, news and update of the travel agency.
  Bill, quotation format
*/

/*
Real estate agency - Dashboard
1. Properties - sale/rent, address, property type, property area
2. Customers - personal information and address
3. Deals - Active, completed,
4. Expense
5. Staff
6. Report
7. configuration
*/

/*
Festival management - Dashboard - Overall income, expense, balance amount
1. Wings
2. Flat - select wing, flat no, name, owner/tenant, mobile number, whatsApp number
3. Shops
  festival list
4. Festival - Year selection -> select/add festival (Festival name, date, no. of days, minimum contribution) -> festival dashboard (income, expense, balance)
  list of members with + button to add the income, no. of persons and filter option
  new income -> wing / shop -> select flat -> date, amount, payment type (Cash, UPI, bank transfer), status (Received, pending), receipt status (issued, Pending), no. of persons
  new expense -> expense name, amount, date, expense type (Cash, UPI, bank transfer), receipt number / transaction ID
  Events and competition enrollment
5. Report - year wise, festival wise
6. Configuration

=> year -> festival -> income, expense
*/
