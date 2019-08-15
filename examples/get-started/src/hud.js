// Copyright (c) 2019 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, {PureComponent} from 'react';
import {_BaseWidget as BaseWidget, MeterWidget} from 'streetscape.gl';

const METER_WIDGET_STYLE = {
  arcRadius: 42,
  msrValue: {
    fontSize: 15,
    fontWeight: 700,
    paddingTop: 3
  },
  units: {
    fontSize: 14
  }
};

/* eslint-disable camelcase */
const AUTONOMY_STATE = {
  Autonomous: '#4775b2',
  Manual: '#b5b5b5',
  Ready: '#248f00',
  Hard_Handback: '#fc2323',
  Starting_Autonomy: '#22bfad',
  unknown: '#8c038f'
};

export default class HUD extends PureComponent {
  _renderAutonomyState({streams}) {
    const state = (streams.state.data && streams.state.data.variable) || 'unknown';
    return (
      <div className="autonomy-state" style={{background: AUTONOMY_STATE[state]}}>
        {state}
      </div>
    );
  }

  render() {
    const {log} = this.props;

    return (
      <div id="hud">
        <div className="hud-column">
          <BaseWidget log={log} streamNames={{state: '/vehicle/autonomy_state'}}>
            {this._renderAutonomyState}
          </BaseWidget>
        </div>
        <MeterWidget
          log={log}
          style={METER_WIDGET_STYLE}
          streamName="/vehicle/acceleration"
          units="Acceleration (m/s^2)"
          min={-4}
          max={4}
        />
        <MeterWidget
          log={log}
          style={METER_WIDGET_STYLE}
          streamName="/vehicle/velocity"
          units="Speed (m/s)"
          min={0}
          max={20}
        />
      </div>
    );
  }
}
