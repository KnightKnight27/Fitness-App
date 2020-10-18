import axios from 'axios';

export const fetchAllTrainings = () => async dispatch => {
  const res = await axios.post(
    process.env.REACT_APP_API_ENDPOINT,
    {
      query:
        `{
          allTrainings {
            edges {
              node {
                id
                title
                description
                date
              }
            }
          }
        }`
    }
  );

  const trainingData = res.data.data.allTrainings.edges;

  dispatch({ type: 'FETCH_ALL_SCHEDULE', payload: trainingData });
}

export const fetchOneTrainings = (tid) => async dispatch => {
  const res = await axios.post(process.env.REACT_APP_API_ENDPOINT, {
    query: `
            {
                allTrainings (id:"${tid}"){
                  edges {
                    node {
                      id
                      title
                      description
                      date
                      sections {
                        edges {
                          node {
                            title
                            id
                            time
                            subtopics {
                              edges {
                                node {
                                  id
                                  title
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }`
  });

  const trainingData = res.data.data.allTrainings.edges;
  dispatch({ type: 'FETCH_SINGLE_SCHEDULE', payload: trainingData });
}


export const addTraining = (newSchedule) => async (dispatch) => {


  await axios.post(
    process.env.REACT_APP_API_ENDPOINT,
    {
      query: `
      mutation{
           createTraining(input: {title: "${newSchedule.title}", description: "${newSchedule.description}", date: "${newSchedule.date}"}){
             training {
               id
               title
               description
               date
             }
           }
         }`
    });

  newSchedule.sections.forEach(async (section) => {

    await axios.post(
      process.env.REACT_APP_API_ENDPOINT,
      {
        query: `mutation{
               createSection(input: {training: "${newSchedule.title}" ,title: "${section.title}", time: "${section.time}"}){
                 section {
                   id
                   time
                   title
                 }
               }
             }`

      });

    section.subtopics.forEach(async (subtopic) => {
      let subtopicRes = await axios.post(
        process.env.REACT_APP_API_ENDPOINT,
        {
          query: `
           mutation{
               createSubtopic (input: {training: "${newSchedule.title}" , section: "${section.title}", title: "${subtopic}"}){
                 subtopic {
                   id
                   title
                 }
               }
             }
          `
        }
      )
    })

  });



  dispatch({ type: 'UPDATE_TRAINING_SCHEDULE' });
}
