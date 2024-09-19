import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap"


const OverlayGrid = ({title, elements, cols, buttonColor='outline-info'}) => {
    return (
        <article 
            className="m-3 p-3 border rounded"
        >
            <h2>{title}</h2>
            <Container>
                <Row
                    className='g-3 justify-content-center'
                >
                    {elements.map(({title, content}, index)=>{                        
                        return (
                            <Col
                                key={index}
                                className={`d-flex col-sm-${cols}`}
                            >
                                <OverlayTrigger 
                                    placement="bottom"
                                    overlay={
                                        <Tooltip>{content}</Tooltip>
                                    }
                                >
                                    <Button 
                                        variant={buttonColor}
                                        className="flex-fill"
                                        style={{whiteSpace:'break-spaces'}}
                                    >{title}</Button>
                                </OverlayTrigger>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </article>
    )
}

export default OverlayGrid