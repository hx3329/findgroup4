import { Component } from "react";
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility
} from "semantic-ui-react";
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import fakeAuth from "../Auth/fakeAuth";

class DesktopContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "home"
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    fakeAuth.out();
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  hideFixedMenu = () => {
    this.setState({ fixed: false });
  };
  showFixedMenu = () => {
    this.setState({ fixed: true });
  };
  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    const { activeItem } = this.state;

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign="center"
            vertical
          >
            <Menu
              fixed={fixed ? "top" : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item>
                </Menu.Item>
                <Menu.Item
                  name="home"
                  active={activeItem === "home"}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/"
                >
                  Home
                </Menu.Item>
                <Menu.Item
                  name="map"
                  active={activeItem === "map"}
                  onClick={this.handleItemClick}
                  as={Link}
                  to="/map"
                >
                  Map
                </Menu.Item>
                {
                  //check login or not
                  fakeAuth.isAuthenticated ? (
                  <Menu.Item position="right">
                      <Button as={Link} to="/data"  color='teal' inverted={!fixed} style={{ marginRight: "0.5em" }}>
                           InputData
                      </Button>
                    <Button onClick={this.logout} inverted={!fixed}>
                      Log out
                    </Button>
                    <Button
                      as={Link}
                      to="/profile"
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: "0.5em" }}
                    >
                      Profile
                    </Button>
                  </Menu.Item>
                ) : (
                  <Menu.Item position="right">
                    <Button as={Link} to="/login" inverted={!fixed}>
                      Log in
                    </Button>
                    <Button
                      as={Link}
                      to="/signup"
                      inverted={!fixed}
                      primary={fixed}
                      style={{ marginLeft: "0.5em" }}
                    >
                      Sign Up
                    </Button>
                  </Menu.Item>
                )}
              </Container>
            </Menu>
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node
};

export default DesktopContainer;
