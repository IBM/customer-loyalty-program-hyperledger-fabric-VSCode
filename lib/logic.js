/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/* global getParticipantRegistry emit */


/**
 * Sample transaction
 * @param {org.clp.biznet.EarnPoints} earnPoints
 * @transaction
 */
async function EarnPoints(earnPoints) {
    
  	//update member points
    earnPoints.member.points = earnPoints.member.points + earnPoints.points;
  
  	//update member
    const memberRegistry = await getParticipantRegistry('org.clp.biznet.Member');
	await memberRegistry.update(earnPoints.member);
      
    // check if partner exists on the network
    const partnerRegistry = await getParticipantRegistry('org.clp.biznet.Partner');
    partnerExists = await partnerRegistry.exists(earnPoints.partner.id);
    if (partnerExists == false) {
      throw new Error('Partner does not exist - check partner id');
    }
	    
}


/**
 * Sample transaction
 * @param {org.clp.biznet.UsePoints} usePoints
 * @transaction
 */
async function UsePoints(usePoints) {

  	//check if member has sufficient points
    if(usePoints.member.points < usePoints.points) {
        throw new Error('Insufficient points');
    }
	
	//update member points
    usePoints.member.points = usePoints.member.points - usePoints.points    
        
    //update member
    const memberRegistry = await getParticipantRegistry('org.clp.biznet.Member');
	await memberRegistry.update(usePoints.member);
      
    // check if partner exists on the network
    const partnerRegistry = await getParticipantRegistry('org.clp.biznet.Partner');
    partnerExists = await partnerRegistry.exists(usePoints.partner.id);
    if (partnerExists == false) {
      throw new Error('Partner does not exist - check id');
    }
}
