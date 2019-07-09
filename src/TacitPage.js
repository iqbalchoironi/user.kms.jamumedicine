import React, { Component, Fragment } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link2 from '@material-ui/core/Link';
import SearchInput from './SearchInput'
import Spinner from './Spinner'

import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark'
import DateRange from '@material-ui/icons/DateRange'
import Pagination from "material-ui-flat-pagination";

import SnackBar from './SnackBar'
import ErorPage from './ErorPage'

function ListTacit (props) {
    return (
        <div style={{
            marginTop: "25px"
        }}> 
        <Typography variant="subtitle1" style={{
            color: "#1976d8"
        }}>
        <Link to={`/tacit/${ props.id }`}>
            {props.title}
        </Link>
        </Typography>
        <Typography variant="caption" >
             <Person /> {props.name}
        </Typography >
        <Typography variant="caption" >
             <CollectionsBookmark /> Conference paper <DateRange /> 12-12-2001
        </Typography>
        <p className="block-with-text">
            {props.abstract}
        </p>
       </div>
    )
}


class TacitPage extends Component {
      constructor(props) {
        super(props);
        this.state = {
          loading: true,
          loadData: false,
          explicit : [],
          currentPage: 1,
          snackbar: {
            open: false,
            success: false,
            message: '',
          }
        }
        // this.onScroll = this.onScroll.bind(this);
        this.afterUpdate = this.afterUpdate.bind(this);
        this.closeBtn = this.closeBtn.bind(this);
      }
    
      async componentDidMount() {
        // window.addEventListener('scroll', this.onScroll);
        this.getData();
      }
      
    //   async onScroll() {
    //     if (
    //       window.innerHeight + document.documentElement.scrollTop
    //       === document.documentElement.offsetHeight
    //     ) {
    //       // Do awesome stuff like loading more content!
    //       await this.setState({
    //         loadData: true,
    //         currentPage: this.state.currentPage + 1
    //       })
    //       this.getData();
    //     }
    //   }
      
      async getData(){
        try {const url = '/jamu/api/tacit';
        const res = await Axios.get(url);
        const { data } = await res;
        let newData = this.state.explicit.concat(data.data);
        console.log(newData)
        this.afterUpdate(data.success, data.message);
        this.setState({
          explicit: newData, 
          loading: false,
          offset:5
        })} catch (err){
          console.log(err.message)
          this.afterUpdate(false, err.message);
          this.setState({
            onEror: true,
            loading: false
          })
        }
      }
    
        logout = event => {
            window.location.href = '/form/explicit';
        }
        handleClick(offset,page) {
          console.log(page)
          this.setState({ offset });
        }

        async afterUpdate (success, message){
          this.setState({
            snackbar: {
              open: true,
              success: success,
              message: message,
            }
          })
        }
    
        closeBtn() {
          this.setState({
            snackbar: {
              open: false,
              success: false,
              message: '',
            }
          })
        }

    render (){
        return (
            <div style={{
                display:"flex",
                flexDirection:"column",
                margin: "auto",
                marginTop:"100px",
                width:"100%"
            }}>
                <div style={{
                  width:"95%",
                  display:"flex",
                  flexDirection:"row",
                  margin:"auto"
                }}>
                  <div style={{
                    width:"50%",
                    display:"flex",
                    flexDirection:"row"
                  }}>
                    <Breadcrumbs aria-label="Breadcrumb">
                      <Link2 color="inherit" href="/" >
                        KMS Jamu
                      </Link2>
                      <Link2 color="inherit" >
                        Explore
                      </Link2>
                      <Typography color="textPrimary">Tacit Knowledge</Typography>
                    </Breadcrumbs>
                  </div>
                  <div style={{
                    width:"50%",
                    display:"flex",
                    flexDirection:"row-reverse"
                  }}>
                    <SearchInput />
                  </div>
                </div>
                {
                this.state.onEror ? <ErorPage />
                :
                  this.state.loading ?
                  <Spinner />
                  :
                  <Fragment>
                  <div style={{
                    display:"flex",
                    flexDirection:"row",
                    margin:"auto",
                    border:"hsl(0,0%,80%) 1px solid",
                    width:"95%",
                    marginBottom: "10px"
                    }}>
                        <div style={{
                            width:"20%",
                            maxHeight: "350px",
                            border:"hsl(0,0%,80%) 1px solid"
                        }}> 
                            
                        </div>
                        <div style={{
                            width:"80%",
                            border:"hsl(0,0%,80%) 1px solid",
                            padding: "25px",
                            minHeight:"500px"
                        }}>
                          {this.state.explicit.map(item =>
                            <ListTacit key={item._id} id={item._id} name={item.firstName+' '+item.lastName} title={item.title} abstract={item.abstract} />
                          )}
                      </div>
                  </div>  
                  <Pagination
                    style={{
                      margin:"auto",
                      marginBottom: "10px"
                    }}
                    size='large'
                    limit={10}
                    offset={this.state.offset}
                    total={250}
                    onClick={(e,offset, page) => this.handleClick(offset,page)}
                  />
                  </Fragment> 
                }
                 {this.state.snackbar.open === true ? <SnackBar data={this.state.snackbar} close={this.closeBtn}/>
                  : 
                  null
                  }
            </div>
        );
    }
}

export default TacitPage;
