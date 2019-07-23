// youtube code

export default ({ youtubeId }) => {
    return (
        <div
            className="video"
            style={{ // style should go to css file not here
                position: "relative",
                paddingBottom: "56.25%" /* 16:9 */,
                paddingTop: 25,
                height: 0
            }}
        >
            <iframe
                style={{ // style should go to css file not here
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%"
                }}
                src={`https://www.youtube.com/embed/${youtubeId}`}
                frameBorder="0"
            />
        </div>
    );
};


//  .video {
//     position: relative;
//     padding-bottom: 56.25%;
//     padding-top: 25;
//     height: 0
// }

// iframe {
//     position: absolute; 
//     top: 0;
//     left: 0; 
//     width: 85vw,
//     height: 100vh

// } 
// .content {
//     position: fixed;
// } 