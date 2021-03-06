import React, { Component } from 'react';
import { UIManager, ViewPropTypes, requireNativeComponent, findNodeHandle } from 'react-native';

const NATIVE_REF = 'NativeCastButton';

export default class CastButton extends Component {
    constructor() {
        super();
    }

    showDialog() {
        const handle = findNodeHandle(this.refs[NATIVE_REF]);
        UIManager.dispatchViewManagerCommand(handle, 1, null);
    }

    render() {
        return <NativeCastButton {...this.props} ref={NATIVE_REF} />;
    }
}

CastButton.propTypes = {
    ...ViewPropTypes
};

const NativeCastButton = requireNativeComponent('TrackPlayerCastButton', CastButton);
