# Maestro Challenge

For the Hive Hiring Challenge, I chose to do the Logical Challenge.  The utility I created
is a practice tool for musicians.  It allows them to timestamp YouTube videos with 
rehearsal marks and use those timestamps to navigate through the video.  As a result,
musicians who use YouTube videos to practice no longer have to manually scrub and 
remember at what time a musical excerpt begins.

Additionally, the utility provides the ability to start segments of the video with a count in.
This count in allows the musician to start the timestamp with time hear the tempo of the piece, pick up
their instrument and enter with the video in time.

The video is selected in the application using the same format of YouTube video urls.  For
example, if the video you want to watch is located at [http://youtube.com/watch?v=6KnnbiBwwTU](http://youtube.com/watch?v=6KnnbiBwwTU), the
video can be pulled up in the utility by going to the address 
[http://maestrochallenge.jgibson.io/watch?v=6KnnbiBwwTU](http://maestrochallenge.jgibson.io/watch?v=6KnnbiBwwTU)

To run the demo and see an example video, click [here](http://maestrochallenge.jgibson.io/watch?v=6KnnbiBwwTU).

## Installation
The utility is already installed and running at [http://maestrochallenge.jgibson.io/watch?v=6KnnbiBwwTU](http://maestrochallenge.jgibson.io/watch?v=6KnnbiBwwTU/), however if you would like to run the project yourself, you may download the code from this repository and do so.

Before it can be run, you must first create two `.env` files.  The first is in the `graphql_server` directory.  The `.env` file should be as follows:

```
DB_HOST = "mongodb://ds145188.mlab.com:45188/gibson_maestro_challenge"
DB_TEST_HOST = "mongodb://ds131687.mlab.com:31687/gibson_maestro_test"
DB_USER = ""
DB_PASSWORD = ""
```

where `DB_USER` and `DB_PASSWORD` are the credentials provided in the email from Josh.

The other `.env` file should be in the `react-app` directory and should be as follows:

```
REACT_APP_APOLLO_SERVER="http://localhost:4000"
```

After the `.env` files are setup up, within `graphql_server` and `react-app`, `npm install` should 
be called to install the dependencies for each project.

Finally, run `npm start` within the `graphql_server` directory and then within the `react-app` directory run the GraphQL server that will be queried by the React Application.

In your browser you can then go to [http://localhost:3000/watch?v=6KnnbiBwwTU](http://localhost:3000/watch?v=6KnnbiBwwTU) and run the application.

## User Instructions


Each video has a set of Timestamp Collections which are groups of individual Timestamps for the video. 
To create Timestamps, a Timestamp Collection must be created and selected in the lower left-hand pane.
If there are no Timestamp Collections, simply click the add button to create one.

Once a Timestamp Collection has been created, Timestamps can be created an added to it.  Timestamps are
a title and a time in the video.  The time should be formatted 'hh:mm:ss.ms'.  Additionally, an optional 
BPM can be provided so a metronome can run for a count-in.

To edit an item (Timestamp or Collection), click the edit icon.  Clicking the icon again saves the changes.

Once Timestamps have been created, Plackback Controls can be configured.  Turning on Count-In will add a four-count count-in before each timestamp at the provided BPM.  Turning on Loop will allow you to select two Timestamps to start a loop.  The video will begin at the first timestamp, run until the second, and 
reset to the first one.  To stop the loop, simply pause the video or manually change the time on the 
YouTube video.  This essentially breaks the video out of the loop.

# Technologies used

## Client Side
- [React](https://reactjs.org/)
- [create-react-app](https://facebook.github.io/create-react-app/)
- [Material-UI](https://material-ui.com/)
- [Tone.js](https://tonejs.github.io/)
- [Apollo-Client](https://www.apollographql.com/docs/react/)

## Server Side
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL](https://graphql.org/)
- [MongoDB](https://www.mongodb.com/)
- [MLab](https://mlab.com/home)

