import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Typography,
  CardContent,
  Avatar,
  Collapse,
  CardActions,
  IconButton
} from '@material-ui/core'
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@material-ui/icons'

export default class Note extends Component {
  state = {
    expanded: false
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }))
  }
  render() {
    const { note } = this.props
    return (
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            paddingTop: '20px'
          }}
        >
          <Avatar>{note.autor.slice(0, 2)}</Avatar>
          <div
            style={{
              fontSize: '9px',
              maxWidth: '70px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {note.autor}
          </div>
        </div>
        <Card style={{ width: '100%', margin: '10px 8px' }}>
          <CardContent>
            <Typography variant="headline" component="h3">
              {note.tag}
            </Typography>
            {note.plainText ? (
              <Typography paragraph>{note.plainText}</Typography>
            ) : (
              <Typography
                variant="headline"
                component="h4"
                style={{ color: 'red' }}
              >
                THIS NOTE WAS NOT SHARED WITH YOU
              </Typography>
            )}
          </CardContent>
          <CardActions
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            disableActionSpacing
          >
            <span>Shared with</span>
            <IconButton aria-label="Show more" onClick={this.handleExpandClick}>
              {this.state.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {Object.values(note.credentials).map(el => (
                <Fragment key={el.publicKey}>
                  <Typography
                    paragraph
                    variant="body2"
                    style={{
                      fontSize: '9px',
                      maxWidth: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {el.publicKey}
                  </Typography>
                </Fragment>
              ))}
            </CardContent>
          </Collapse>
        </Card>
      </div>
    )
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired
}
