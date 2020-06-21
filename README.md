# Manage Application State with React Hooks and Amplify DataStore



## Objectives

- Expense Manager with React Hooks: useState, useEffect, useReducer, useContext

- All States managed by React Hooks, no Redux

- States:
    - expenses => Sync expenses state with Amplify DataStore for Offline and Online persistent data
        - id (ID! on schema.graphql)
        - date (UNIX Timestamp for sorting, Float! on schema.graphql)
        - description (String!)
        - amount (String! => ParseFloat for processing)
        - note (String)
    - filters
        - text, default: ''
        - sortBy, default: 'date', other option: 'amount'
        - startDate, default: firstDay
        - endDate, default: lastDay
    - status (printing messages to dashboard during CRUD operations)
    
        
    
- Sync state with Amplify DataStore on initial App mount

- Save state to Amplify DataStore only on dependency-state changes (expenses state)

- Integrate Amplify DataStore

- Offline and Online support with Amplify DataStore



## 💫 Deploy to AWS Amplify

[![amplifybutton](https://oneclick.amplifyapp.com/button.svg)](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/sigitp-git/s3fileupload-react-amplify)



## App ScreenShots

### Fetching Expenses Async Function

Fetching Expenses from DataStore, save to local state, shows Loading Page during async fetching process.

If you have fast network speed, you might only see this loading page for a very short time.

![](/Users/sigitp/Documents/expense-manager-amplify-datastore/public/loader.svg)

### Initial App Mount

- Load Amplify DataStore once, save into local state
- State managed by React Hooks: `useSate(), useEffect(), useReducer(), useContext()`
- Summarize total recorded expenses, calculate from State, save network cost to the back-end
- Default filter by Date
- Default startDate and endDate filter to the current month
- All filters state managed locally, not synced with Amplify DataStore to save cost



![](/Users/sigitp/Documents/expense-manager-amplify-datastore/index.png)



### Cleared Date Range Picker Selection

Cleared Date Range Picker Selection shows all expenses recorded

![](/Users/sigitp/Documents/expense-manager-amplify-datastore/filters1.png)



### Sort By Amount

Shows highest amount then to the lowest amount

![](/Users/sigitp/Documents/expense-manager-amplify-datastore/filters2.png)



### Search Expenses

Simple Array search to find expense based on description or notes

![](/Users/sigitp/Documents/expense-manager-amplify-datastore/search.png)



## GraphQL Schema

```javascript
type Expense @model {
  id: ID!
  createdAt: Float!
  description: String!
  amount: Float!
  note: String
}
```



id:ID! => mandatory ID, provided by DynamoDB item ID

createdAt => UNIX Timestamp, stored as Float

description, note => stored as String, description is mandatory

amount => stored as Float, mandatory



## Amplify DataStore Specific Code

### Fetching Data Async Function

Fetching Expenses from DataStore, save to local state, shows Loading Page during async fetching process.

If you have fast network speed, you might only see this loading page for a very short time, source: `src/index.js`

```javascript
let expensesDS
const fetchExpenses = async () => {
  expensesDS = await DataStore.query(Expense, Predicates.ALL)
}

ReactDOM.render(<Loading />, document.getElementById('root'))

let hasRendered = false
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(
      <React.StrictMode>
        <App expenses={expensesDS} />
      </React.StrictMode>,
      document.getElementById('root')
    )
    hasRendered = true
  }
}

fetchExpenses().then(() => renderApp())
```



### Initial Load from Amplify DataStore to local State

Source: `src/App.js`

```javascript
  // Expenses state
  const [expenses, dispatchExpenses] = useReducer(expenseReducer, [])

  // Fetch expenses from DataStore, put into expenses state, just once during initial mount
  useEffect(() => {
    if (!!props.expenses) {
      dispatchExpenses({
        type: 'FETCH_EXPENSES',
        expenses: props.expenses,
      })
    }
  }, [props.expenses])
```



### Remove Data from local State and Amplify DataStore

Source: `src/components/Edit.js`

```javascript
  // Remove expense from DataStore
  const rmExpenseFrDS = async (id) => {
    const toDelete = await DataStore.query(Expense, id)
    DataStore.delete(toDelete)
  }
  
    const onHandleDelete = () => {
    dispatchExpenses({
      type: 'RM_EXPENSE',
      id: props.match.params.id,
    })
    // Save expense to Datastore
    rmExpenseFrDS(props.match.params.id).then(() => props.history.push('/'))
  }
```



### Update Data to local State and Amplify DataStore

Source: `src/components/Edit.js`

```javascript
  // Save updated expense to DataStore
  const updateExpenseToDS = async ({
    id,
    createdAt,
    description,
    amount,
    note,
  }) => {
    const toUpdate = await DataStore.query(Expense, id)
    await DataStore.save(
      Expense.copyOf(toUpdate, (updated) => {
        updated.createdAt = parseFloat(createdAt)
        updated.description = description
        updated.amount = amount
        updated.note = note
      })
    )
  }
  
            onSubmit={({ createdAt, description, amount, note }) => {
            dispatchExpenses({
              type: 'EDIT_EXPENSE',
              id: props.match.params.id,
              expense: { createdAt, description, amount, note },
            })
            updateExpenseToDS({
              id: props.match.params.id,
              createdAt,
              description,
              amount,
              note,
            }).then(() => props.history.push('/'))
          }}
```



## Available Scripts, from Create React App

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


