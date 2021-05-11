import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import DateRange from "@material-ui/icons/DateRange";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { makeStyles } from "@material-ui/core/styles";
import CardAvatar from "components/Card/CardAvatar.js";

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.js";
import Icon from "@material-ui/core/Icon";
import Warning from "@material-ui/icons/Warning";
import Search from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  fa: {
    marginTop: theme.spacing(10),
  },
  cardCategoryBlack: {
    "&,& a,& a:hover,& a:focus": {
      color: "#050505",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FF0000",
    },
  },
  cardTitleBlack: {
    color: "#050505",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const Regis= (props) => {
  const classes = useStyles();
  const [result, setResult] = useState([]);
  const [open, setOpen] = React.useState(false);
  const[bookid,setBookid]=useState("");
  const [tl, setTL] = React.useState(false);
  const [apiKey, setApi] = useState("AIzaSyAgSHBFJnBtmr1iIFMtslpoJPtZKJKhq2Q");
  const [tc, setTC] = React.useState(false);
  const [tr, setTR] = React.useState(false);
  const [bl, setBL] = React.useState(false);
  const [bc, setBC] = React.useState(false);
  const [br, setBR] = React.useState(false);
  const[reco,setRecommend]=React.useState([]);
  React.useEffect(() => {
    return function cleanup() {
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });

  const showNotification = place => {
    switch (place) {
      case "tl":
        if (!tl) {
            console.log(1+2);
          setTL(true);
          setTimeout(function() {
            setTL(false);
          }, 6000);
        }
        break;
      case "tc":
        if (!tc) {
          setTC(true);
          setTimeout(function() {
            setTC(false);
          }, 6000);
        }
        break;
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function() {
            setTR(false);
          }, 6000);
        }
        break;
      case "bl":
        if (!bl) {
          setBL(true);
          setTimeout(function() {
            setBL(false);
          }, 6000);
        }
        break;
      case "bc":
        if (!bc) {
          setBC(true);
          setTimeout(function() {
            setBC(false);
          }, 6000);
        }
        break;
      case "br":
        if (!br) {
          setBR(true);
          setTimeout(function() {
            setBR(false);
          }, 6000);
        }
        break;
      default:
        break;
    }
  };


  const handleClickOpen = (e) => {
    e.preventDefault();
    const bok = e.currentTarget.getAttribute("data-key");
    setBookid(bok);
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          bok +
          "&key=" +
          apiKey +
          "&maxResults=1"
      )
      .then((data) => {
        // console.log(data);
        setResult(data.data.items);
      });
      axios.post("http://localhost:3001/api/machineModel",{isbn:bok}).then((data)=>{
        // setRecommend(data);
      });    
      setOpen(true);
  }
  const handleAdd=(event)=>{
    const book=result.[0].volumeInfo.title;
    const bookauthor=result.[0].volumeInfo.authors.[0];
    const bookdes=result.[0].volumeInfo.description;
    const bookthumb=result.[0].volumeInfo.imageLinks.thumbnail;
    axios.post("http://localhost:3001/api/insert", { id:localStorage.getItem('userEmail'),bookid:bookid,bookname: book,bookd:bookdes,bookauthor:bookauthor,booktumbnail:bookthumb }).then((data) => {
      alert("added!");
    });
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        data-key={props.Book_id}
        onClick={handleClickOpen}
      >
        Add To Books
      </Button>
       {result.map((book) => (
        <Dialog
          key={book.id}
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {book.volumeInfo.title}
              </Typography>
              <Button autoFocus round color="danger" onClick={handleClose}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
          <GridContainer margin-top="100px">
          <GridItem xs={12} sm={6} md={8} key={book.id}>
            <Card>
              <CardHeader color="success" stats icon round>
                <CardIcon color="success">
                  <img
                    radius="2px"
                    height="150px"
                    width="120px"
                    src={
                      book.volumeInfo.imageLinks === undefined
                        ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAM1BMVEXp7vG6vsHs8fS3u77Fycy+wsXc4eTX3N/h5unT2NrHzM7N0tW1ubzu8/W7v8LBxcjl6uwx8f6JAAADy0lEQVR4nO2c23aDIBBFCQheUf//a6vRpEZuJgXj0LNXH7oaK3WXwXEQGAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwGnw9Hz7Et+Ds1ElpxoJaeGsHHqRHlkoKlJ0JbvbKQhRjCSs8FKcY+RuRVKQwqsTlUxShm9f8BGGU53cuvryHeXUyLnTj9++5hC8WJ2kv+2sTkR79Y4y9uuf2papKVYnxcWd8GpV0uj0aaxcnFx9lH04ESeMfLpZ2pLJW/obZzrhcGK2BSdmW3BitkXdyfxYz7mO2hZtJ7yqCznIoVUsXv8h7YSPzZJ2CtENZTQplJ1Mj0CbZ6CuiFUdI+yEt69PhUJGih+6Tni5L7qJJlJbZJ2MZu1A1FHuP2Sd7CPnTh+nLapOKtNIrIyOqhNe28puYvjXThp7KfKAE16FDqDqxF6x7sI1VK26wFCcmRMR6gOTEhG6P+XmJNRPtJrruqL0SSHrxD6ehJxwtZS6vVLIOrFP9wTuO1o95XnCh6qTj/ITrsSRQ8k6Ydbg8YYOV9tDhbO4QNaJbUrd301elXikkHUyZbLGc7F34m4bOI9z2ccUuk6Ybl+liMFXP9GGEme/IuxkfubZXKcofL+vVW8ocYUPZSfThRbdYkUIWftKj3YljjyFtBPGtWplL259UzJfZmoLHPeYQtvJMr0zjsxfnnYrsY4p1J0c+l1H4DzOaByfv5N9XhLsKfk7MfOSkJTsnYSVGANt7k50IHBsZ83ciSsv8faUjJxw821w303YLSUfJ7q+VbvPjit5eRs2Gyfzw0//usTkaODsz5yLk6mXTPTbnhLKS5xSMnGyKJnnMn4j4I3AWeie9e8cnGxmSh/h876S55CShZNtEX8Nn3eG1xyd6Nf59FnKsVQtXyf7qR5R6U96SU5OLG9dVB8pyceJbUJQvpOX5OdElx9dfs5OdMxVgnk4ibtwMgsnvI5oJA8nMceSTJxEHUvycBJ/ETZ5JwnWpZN3Yn1n+H874RJODr4LCidwAic74MQETkzgxAROTODEBE5MzDy2i763VEfcCVOlmr+UMr8J/8DxybpIjKyTlG3BidkWnJhtwYnZFpyYbcGJ2VZBwwkb18SqV6lb4usUyeX3NmTrJozzvy81j7S2Sd8l/4a27XeSFHH5jbqfG4OexvVDx7HjSTqu300Y+91p+BS6NuregKnQjn1gEiBCe6RcBl7K6AUCO0VFRMm89EK1RXKatoq4e+QJJN+N+r4jNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzuIHpk8/wVCHmdcAAAAASUVORK5CYII="
                        : book.volumeInfo.imageLinks.smallThumbnail
                    }
                  />
                </CardIcon>
                <p className={classes.cardTitleBlack}> {book.volumeInfo.title}</p>
                <h6 className={classes.cardCategoryBlack}>
                  {" "}
                  {book.volumeInfo.description === undefined
                    ? "Unknown"
                    : book.volumeInfo.description}
                </h6>
              </CardHeader>
              <CardBody>
               
              </CardBody>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  {book.volumeInfo.authors === undefined
                    ? "Unknown"
                    : book.volumeInfo.authors}
                  {book.volumeInfo.authors === undefined
                    ? "Unknown"
                    : book.volumeInfo.averageRating}
                  {book.volumeInfo.categories === undefined
                    ? "Unknown"
                    : book.volumeInfo.categories}

                  {book.volumeInfo.publishedDate === undefined
                    ? "Unknown"
                    : book.volumeInfo.publishedDates}
                  {book.volumeInfo.pageCount === undefined
                    ? "Unknown"
                    : book.volumeInfo.pageCount}
                  {book.volumeInfo.subtitle === undefined
                    ? "Unknown"
                    : book.volumeInfo.subtitle}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card profile className={classes.fa}>
                <CardAvatar profile>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img radius="2px"
                      height="150px"
                      width="120px"
                    src={
                      book.volumeInfo.imageLinks === undefined
                        ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAM1BMVEXp7vG6vsHs8fS3u77Fycy+wsXc4eTX3N/h5unT2NrHzM7N0tW1ubzu8/W7v8LBxcjl6uwx8f6JAAADy0lEQVR4nO2c23aDIBBFCQheUf//a6vRpEZuJgXj0LNXH7oaK3WXwXEQGAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwGnw9Hz7Et+Ds1ElpxoJaeGsHHqRHlkoKlJ0JbvbKQhRjCSs8FKcY+RuRVKQwqsTlUxShm9f8BGGU53cuvryHeXUyLnTj9++5hC8WJ2kv+2sTkR79Y4y9uuf2papKVYnxcWd8GpV0uj0aaxcnFx9lH04ESeMfLpZ2pLJW/obZzrhcGK2BSdmW3BitkXdyfxYz7mO2hZtJ7yqCznIoVUsXv8h7YSPzZJ2CtENZTQplJ1Mj0CbZ6CuiFUdI+yEt69PhUJGih+6Tni5L7qJJlJbZJ2MZu1A1FHuP2Sd7CPnTh+nLapOKtNIrIyOqhNe28puYvjXThp7KfKAE16FDqDqxF6x7sI1VK26wFCcmRMR6gOTEhG6P+XmJNRPtJrruqL0SSHrxD6ehJxwtZS6vVLIOrFP9wTuO1o95XnCh6qTj/ITrsSRQ8k6Ydbg8YYOV9tDhbO4QNaJbUrd301elXikkHUyZbLGc7F34m4bOI9z2ccUuk6Ybl+liMFXP9GGEme/IuxkfubZXKcofL+vVW8ocYUPZSfThRbdYkUIWftKj3YljjyFtBPGtWplL259UzJfZmoLHPeYQtvJMr0zjsxfnnYrsY4p1J0c+l1H4DzOaByfv5N9XhLsKfk7MfOSkJTsnYSVGANt7k50IHBsZ83ciSsv8faUjJxw821w303YLSUfJ7q+VbvPjit5eRs2Gyfzw0//usTkaODsz5yLk6mXTPTbnhLKS5xSMnGyKJnnMn4j4I3AWeie9e8cnGxmSh/h876S55CShZNtEX8Nn3eG1xyd6Nf59FnKsVQtXyf7qR5R6U96SU5OLG9dVB8pyceJbUJQvpOX5OdElx9dfs5OdMxVgnk4ibtwMgsnvI5oJA8nMceSTJxEHUvycBJ/ETZ5JwnWpZN3Yn1n+H874RJODr4LCidwAic74MQETkzgxAROTODEBE5MzDy2i763VEfcCVOlmr+UMr8J/8DxybpIjKyTlG3BidkWnJhtwYnZFpyYbcGJ2VZBwwkb18SqV6lb4usUyeX3NmTrJozzvy81j7S2Sd8l/4a27XeSFHH5jbqfG4OexvVDx7HjSTqu300Y+91p+BS6NuregKnQjn1gEiBCe6RcBl7K6AUCO0VFRMm89EK1RXKatoq4e+QJJN+N+r4jNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzuIHpk8/wVCHmdcAAAAASUVORK5CYII="
                        : book.volumeInfo.imageLinks.smallThumbnail
                    } alt="..." />
                  </a>
                </CardAvatar>
                <Snackbar
                  place="tl"
                  color="success"
                  icon={AddAlert}
                  message="Yay! Book Details Changed."
                  open={tl}
                  closeNotification={() => setTL(false)}
                  close
                />
                <CardBody profile>
                  <Button color="primary" round onClick={handleAdd}>
                    Add To Books
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
          

          <Divider />
          <GridItem xs={12} sm={6} md={6} key={book.id}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <img
                    radius="2px"
                    height="150px"
                    width="120px"
                    src={
                      book.volumeInfo.imageLinks === undefined
                        ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAM1BMVEXp7vG6vsHs8fS3u77Fycy+wsXc4eTX3N/h5unT2NrHzM7N0tW1ubzu8/W7v8LBxcjl6uwx8f6JAAADy0lEQVR4nO2c23aDIBBFCQheUf//a6vRpEZuJgXj0LNXH7oaK3WXwXEQGAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwGnw9Hz7Et+Ds1ElpxoJaeGsHHqRHlkoKlJ0JbvbKQhRjCSs8FKcY+RuRVKQwqsTlUxShm9f8BGGU53cuvryHeXUyLnTj9++5hC8WJ2kv+2sTkR79Y4y9uuf2papKVYnxcWd8GpV0uj0aaxcnFx9lH04ESeMfLpZ2pLJW/obZzrhcGK2BSdmW3BitkXdyfxYz7mO2hZtJ7yqCznIoVUsXv8h7YSPzZJ2CtENZTQplJ1Mj0CbZ6CuiFUdI+yEt69PhUJGih+6Tni5L7qJJlJbZJ2MZu1A1FHuP2Sd7CPnTh+nLapOKtNIrIyOqhNe28puYvjXThp7KfKAE16FDqDqxF6x7sI1VK26wFCcmRMR6gOTEhG6P+XmJNRPtJrruqL0SSHrxD6ehJxwtZS6vVLIOrFP9wTuO1o95XnCh6qTj/ITrsSRQ8k6Ydbg8YYOV9tDhbO4QNaJbUrd301elXikkHUyZbLGc7F34m4bOI9z2ccUuk6Ybl+liMFXP9GGEme/IuxkfubZXKcofL+vVW8ocYUPZSfThRbdYkUIWftKj3YljjyFtBPGtWplL259UzJfZmoLHPeYQtvJMr0zjsxfnnYrsY4p1J0c+l1H4DzOaByfv5N9XhLsKfk7MfOSkJTsnYSVGANt7k50IHBsZ83ciSsv8faUjJxw821w303YLSUfJ7q+VbvPjit5eRs2Gyfzw0//usTkaODsz5yLk6mXTPTbnhLKS5xSMnGyKJnnMn4j4I3AWeie9e8cnGxmSh/h876S55CShZNtEX8Nn3eG1xyd6Nf59FnKsVQtXyf7qR5R6U96SU5OLG9dVB8pyceJbUJQvpOX5OdElx9dfs5OdMxVgnk4ibtwMgsnvI5oJA8nMceSTJxEHUvycBJ/ETZ5JwnWpZN3Yn1n+H874RJODr4LCidwAic74MQETkzgxAROTODEBE5MzDy2i763VEfcCVOlmr+UMr8J/8DxybpIjKyTlG3BidkWnJhtwYnZFpyYbcGJ2VZBwwkb18SqV6lb4usUyeX3NmTrJozzvy81j7S2Sd8l/4a27XeSFHH5jbqfG4OexvVDx7HjSTqu300Y+91p+BS6NuregKnQjn1gEiBCe6RcBl7K6AUCO0VFRMm89EK1RXKatoq4e+QJJN+N+r4jNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzuIHpk8/wVCHmdcAAAAASUVORK5CYII="
                        : book.volumeInfo.imageLinks.smallThumbnail
                    }
                  />
                </CardIcon>
              <h2 className={classes.cardCategoryBlack}>BOOK RECOMMENDATIONS BASED ON THIS SEARCH</h2> 
                <p className={classes.cardTitleBlack}> {book.volumeInfo.title}</p>
                <h6 className={classes.cardCategoryBlack}>
                  {" "}
                  {book.volumeInfo.description === undefined
                    ? "Unknown"
                    : book.volumeInfo.description}
                </h6>
              </CardHeader>
              <CardBody>
               
                <Regis Book_id={book.volumeInfo.industryIdentifiers.[1].identifier}/>
              </CardBody>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  {book.volumeInfo.authors === undefined
                    ? "Unknown"
                    : book.volumeInfo.authors}
                  {book.volumeInfo.authors === undefined
                    ? "Unknown"
                    : book.volumeInfo.averageRating}
                  {book.volumeInfo.categories === undefined
                    ? "Unknown"
                    : book.volumeInfo.categories}

                  {book.volumeInfo.publishedDate === undefined
                    ? "Unknown"
                    : book.volumeInfo.publishedDates}
                  {book.volumeInfo.pageCount === undefined
                    ? "Unknown"
                    : book.volumeInfo.pageCount}
                  {book.volumeInfo.subtitle === undefined
                    ? "Unknown"
                    : book.volumeInfo.subtitle}
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          </GridContainer>
        </Dialog>
      ))} 
    </div>
  );
};
export default Regis;
