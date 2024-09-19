import React from "react"
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap"

const AboutMe = () => {
    return (
        <section 
            className="m-3"
            aria-labelledby="about-me-heading"
        >
            <header>
                <h1 id="about-me-heading">About Me</h1>
            </header>
            <section className="m-3 p-3 border rounded" aria-label="Developer Bio">
                <h2>Bio</h2>
                <p className="m-3">
                    I am John, the developer of <b>Road To The West</b>. I have been developing small apps and games in Unity with C# since 2012 but in the past 3 years I have been creating MERN and FERN websites. This is my first website using Redux and Bootstrap and I hope that you enjoy it. 
                </p>
                <p>Please let me know if you enjoy the game. It would make my day and encourage me to add accounts, game saving and leaderboards.</p>
            </section>
            <section className="m-3 p-3 border rounded" aria-label="Developer Contact">
                <h2>Contact information for the developer</h2>
                <Container
                    aria-label="Developer Contact Links"
                    className="m-3"
                >
                    <Row 
                        className="g-3 justify-content-center"
                    >
                        <Col 
                            className="d-flex col-sm-3"
                        >
                            <OverlayTrigger 
                                placement="bottom"
                                overlay={
                                    <Tooltip>Email me at JNichols@NichathanGaming.com.</Tooltip>
                                }
                            >
                                <a 
                                    className="btn btn-outline-info flex-fill"
                                    href="mailto:JNichols@NichathanGaming.com?subject=Contact%20from%20Road%20To%20The%20West%20Game&body=Hello%20NichathanGaming,"
                                    aria-label="Email"
                                >Email Me</a>
                            </OverlayTrigger>
                        </Col>
                        <Col 
                            className="d-flex col-sm-3"
                        >
                            <OverlayTrigger 
                                placement="bottom"
                                overlay={
                                    <Tooltip>Visit my LinkedIn.</Tooltip>
                                }
                            >
                                <a 
                                    className="btn btn-outline-info flex-fill"
                                    href="https://www.linkedin.com/in/johnathan-nichols-571b87272"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >LinkedIn</a>
                            </OverlayTrigger>
                        </Col>
                        <Col 
                            className="d-flex col-sm-3"
                        >
                            <OverlayTrigger 
                                placement="bottom"
                                overlay={
                                    <Tooltip>Visit my GitHub Page.</Tooltip>
                                }
                            >
                                <a 
                                    className="btn btn-outline-info flex-fill"
                                    href="https://github.com/J-M-Nichols"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >GitHub</a>
                            </OverlayTrigger>
                        </Col>
                        <Col 
                            className="d-flex col-sm-3"
                        >
                            <OverlayTrigger 
                                placement="bottom"
                                overlay={
                                    <Tooltip>Visit my website.</Tooltip>
                                }
                            >
                                <a 
                                    className="btn btn-outline-info flex-fill"
                                    href="https://www.nichathangaming.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Nichathan Gaming"
                                >NichathanGaming.com</a>
                            </OverlayTrigger>
                        </Col>
                    </Row>
                </Container>
            </section>
        </section>
    )
}

export default AboutMe