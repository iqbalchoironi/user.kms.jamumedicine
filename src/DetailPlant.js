import React, {Component} from 'react';
import Axios from 'axios'
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper'
import Person from '@material-ui/icons/Person';
import CollectionsBookmark from '@material-ui/icons/CollectionsBookmark'
import DateRange from '@material-ui/icons/DateRange'
import Typography from '@material-ui/core/Typography';

import CardMedia from "@material-ui/core/CardMedia";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CardExample from './card'
import Spinner from './Spinner'

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

class DetailPlant extends Component {
    constructor(props) {
        super(props);
           this.state = {
                value: 0,
                detailPlant : [],
                loading: false
            }
        this.handleChange = this.handleChange.bind(this)
        }

        async componentDidMount(){
            this.setState({
                loading:true
            })
            await this.getData()
          }

          async getData(){
            const {id} = this.props.match.params;
            const url = '/jamu/api/plant/get/' + id;
            const res = await Axios.get(url);
            const { data } = await res;
            let RefCrude = await  Promise.all(data.data.refCrude.map(async dt => {
                let urlCrude = '/jamu/api/crudedrug/get/' + dt.idcrude
                let resCrude = await Axios.get(urlCrude);
                let { data } = await resCrude;
                return data.data
            }))

            let detailPlant = data.data
            detailPlant.refCrude = RefCrude
            console.log(detailPlant)
            this.setState({
              detailPlant: detailPlant,
              loading: false
            })
          }
        
          handleChange = (event, value) => {
            this.setState({ value });
          };

  render(){
    return(
        <div>
            {this.state.loading ? 
                <Spinner />
                :
                <div>
                <Paper style={{
                    width:"90%",
                    margin:"auto",
                    marginTop: "80px",
                    marginBottom: "10px",
                    padding: "30px"
                  }}>
                    <Paper style={{
                        width:"90%",
                        margin:"auto",
                        marginTop: "20px",
                        marginBottom: "10px",
                        padding: "30px"
                    }}>
                        <div style={{
                            display:"flex",
                            flexDirection:"row"
                        }}>
                           <div style={{
                               marginRight: "20px"
                           }}>
                               <img style={{
                                   width: "100%",
                                   verticalAlign: "middle",
                                   borderStyle: "none",
                                   maxHeight: "250px",
                                   width:"250px"
                               }}
                               className="img-card" src={this.state.detailPlant.refimg}></img>
                            </div>
                            <div style={{
                            }}>
                                <Typography variant="caption" gutterBottom>
                                    {this.state.detailPlant.idplant}
                                </Typography >
                                <Typography style={{
                                    color:"grey",
                                    fontSize:"30px"
                                }} variant="headline" gutterBottom>
                                    {this.state.detailPlant.sname}
                                </Typography>
                            </div>
                        </div>
                        
                    </Paper>
                   <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                    >
                        {/* <Tab label="Plant" /> */}
                        <Tab label="Crude Drug" />
                        {/* <Tab label="Compound" /> */}
                    </Tabs>
                    <Paper style={{
                        width:"90%",
                        margin:"auto",
                        marginTop: "20px",
                        marginBottom: "10px",
                        padding: "30px"
                    }}>
                    {/* {this.state.value === 0 && 
                    <TabContainer>
                        {this.state.detailPlant.refPlant !== undefined &&
                        <div className="for-card">
                        {this.state.detailPlant.refPlant.map(item =>
                                  <CardExample key={item.id} name={item.sname} image={item.refimg} reff={item.refCrude} />
                                )}
                        </div>
                        }
                        
                    </TabContainer>} */}
                    {this.state.value === 0 && 
                    <TabContainer>
                    {this.state.detailPlant.refCrude !== undefined &&
                    this.state.detailPlant.refCrude.map( itm =>{
                        return(
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography >{itm.sname}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails style={{
                                        display:"flex",
                                        flexDirection:"column"
                                    }}>
                                    <Typography variant="title" gutterBottom>
                                        {itm.name_en}
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                        {itm.gname}
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                        {itm.position}
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                        {itm.effect}
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )
                    })
                    }
                    
                </TabContainer>}
                    {/* {this.state.value === 2 && <TabContainer>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Name</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                item
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Name</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                item
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography >Name</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Typography>
                                item
                            </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </TabContainer>} */}
                    </Paper>
                </Paper>
            </div>
            }
        </div>
    )
  }
}

export default DetailPlant;