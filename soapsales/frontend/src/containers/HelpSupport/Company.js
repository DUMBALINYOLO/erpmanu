import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import  PapperBlock  from '../../components/PapperBlock/PapperBlock';
import styles from './helpSupport-jss';

class Company extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (
      <PapperBlock title="PRIME LEAD CONSULTANCY" icon="ios-help-circle-outline" whiteBg desc="STUDY ABROAD WITH PRIME LEAD CONSULTANCY.">
        <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>COMPANY PROFILE</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Leading Education Consultancy providing the best Guidance to the students who want to study abroad.  We help and give the proper path to Study Abroad.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>PRIME LEAD CORE VALUES</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <p>
                  (1) Honesty, Integrity and Objectivity <br/>
                  (2) Open Communication and Transparency <br/>
                  (3) Professional Skills and Due Care <br/>
                  (4) Confidentiality and Professional Behavior <br/>
                  (5) Consideration, Empathy and Inspiration <br/>
                  (6) Inclusiveness, Impartiality and Respect <br/>
                  (7) Culture of diversity, Innovation and Creativity <br/>
                  (8) Best Value Education <br/>
                  (9) Enterprising Gene and Advance Developing Economy <br/>
              </p>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>PRIME LEAD GOALS</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <p>
                  We aim to achieve the Vision and Mission through the following objectives.<br/>
                  (1) To acquire the adequate knowledge about the study destinations, the institutions, and the programs in order to provide real counseling and guidance. <br/>
                  (2) To develop the necessary skills and knowledge in the field of career counseling for the key team members. <br/>
                  (3) To develop the strong team spirit and provide quality solutions to the students. <br/>
                  (4) To obtain the official representation from the renowned institutions and partner with them to assist the students in early days in the country. <br/>
                  (5) To help the students in identifying the proper courses and selecting good institutions to fulfill their desired goals. <br/>
                  (6) To guide the students through overall documentation, application process, visa lodgment, interview and pre-departure briefings. <br/>
                  (7) To connect the old students with the new students in order to assist the new ones in finding accommodation, job search, and other assistance. <br/>
                  (8) To get the feedback from the students in order to improve our services in future and make it better for the future students <br/>
              </p>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>PRIME LEAD SERVICES</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              <p>
                  We provide all the services that aspiring candidates would require in order to accomplish their academic and professional goals. Following briefs provide concise information about the range of the core services we offer.
                  <br/>
                  (1) Study Abroad <br/>
                  - Career Counseling: We help students decide career options depending on their past academic records, work experience and future aspirations. <br/>
                  - University Selection: We assist students shortlist and decide country and university (-ies) based on their past profile, needs and career goals <br/>
                  - University Application: We aid students in creating error-free applications, because any shortcoming in application process can delay the entire process, resulting in possible rejection of application. <br/>
                  - Scholarship Help: We guide students with regard to applying for various scholarships and financial aids. <br/>
                  - Visa Assistance: We offer expert visa guidance for various countries for studies. <br/>
                  - Pre and Post Departure Sessions: We conduct Pre and Post Departure sessions with our clients to facilitate their transition to overseas countries. <br/>
                  (2) Visa Assistance <br/>
                  - We have been helping students in the filing of their visas. We have delivered 
                    successful visas for many countries. We hold the record of having over 95% 
                    of the successful visa applications. We possess expertise in documentation 
                    processing, application & filing services for those interested in obtaining visa 
                    in various categories such as studies, tourism, and business, among many 
                    others.
              </p>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel expanded={expanded === 'panel7'} onChange={this.handleChange('panel7')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>PRIME LEAD ADMINISTRATION</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
                Prime Lead Consultancy (PLC) is an Education Consultancy with global recognition and reputation, it was established in the year 2018 with a sole purpose of providing the best guidance, expert advice, unbiased, and honest opinion to students who had dreams of pursuing their higher education abroad. We believe that education is a fundamental right and everyone should have access to quality higher education. With this view in mind, we strive to create opportunities for those who have genuine aspiration and honest intention, who seek excellent quality in tuition, student services, qualifications and career prospects post qualification.  We work in the best interest of both students and our partner universities and colleges - we are professional and reliable. Since our inception, we have helped more than 450 students and professionals realize their dreams of studying abroad and obtaining scholarships. 
                Prime Lead Consultancy truly believes in employing people, who demonstrate professionalism and commitment in their work. We have qualified, experienced, trained and professional counselors who offer unbiased and honest opinions to students and professionals. We are confident that our dedicated team’s unique experiences and our Aim is to serve the applicants and fulfill their dreams by helping them to get the Scholarships and Study Visa. Among all the Services provider we do have the higher success rate to provide the satisfactory guidance and helping the clients to achieve their dreams.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </PapperBlock>
    );
  }
}

Company.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Company);
