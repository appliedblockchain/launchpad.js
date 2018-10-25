import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.css'

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
      <div className={styles.displayFlex}>
        <div className={styles.cardContainer}>
          <Avatar>{note.author.slice(0, 2)}</Avatar>
          <div className={styles.addressLabel}>
            {note.author}
          </div>
        </div>
        <Card className={styles.card}>
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
                className={styles.notShared}
              >
                THIS NOTE WAS NOT SHARED WITH YOU
              </Typography>
            )}
          </CardContent>
          <CardActions
            className={styles.cardAction}
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
                <Fragment key={el.address}>
                  <Typography
                    paragraph
                    variant="body2"
                    className={styles.note}
                  >
                    {el.address}
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
