import {
  start,
  doStartSetName,
  doStartSetPatientName,
  doStartSetHahNum
} from './start.js';
import { setName, doSetName } from './name.js';
import { setPatientName, doSetPatientName } from './patientName.js';
import { setHahNum, doSetHahNum } from './hahNum.js';

export default {
  start,
  doStartSetName,
  doStartSetHahNum,
  doStartSetPatientName,
  setName,
  doSetName,
  setPatientName,
  doSetPatientName,
  setHahNum,
  doSetHahNum,

  // Include lowercase option too
  //   because telegram only allows lowercase commands
  setname: setName,
  setpatientname: setPatientName,
  sethahnumber: setHahNum,
}
