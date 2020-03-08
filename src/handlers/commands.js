import { start, doStartSetName, doStartSetPatientId } from './start.js';
import { setName, doSetName } from './name.js';
import { setPatientId, doSetPatientId } from './patientId.js';

export default {
  start,
  doStartSetName,
  doStartSetPatientId,
  setName,
  doSetName,
  setPatientId,
  doSetPatientId,

  // Include lowercase option too
  //   because telegram only allows lowercase commands
  setname: setName,
  setpatientid: setPatientId,
}
