/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ConnectionPointer } from '../../../../../../../../graph/metamodel/pure/packageableElements/connection/Connection.js';
import { SnowflakeAppDeploymentConfiguration } from '../../../../../../../../graph/metamodel/pure/functionActivator/SnowflakeAppDeploymentConfiguration.js';
import type { V1_SnowflakeAppDeploymentConfiguration } from '../../../../engine/functionActivator/V1_SnowflakeAppDeploymentConfiguration.js';
import type { V1_GraphBuilderContext } from '../V1_GraphBuilderContext.js';
import { V1_buildConnection } from './V1_ConnectionBuilderHelper.js';
import { UnsupportedOperationError, guaranteeType } from '@finos/legend-shared';
import {
  DeploymentOwner,
  type Ownership,
} from '../../../../../../../../graph/metamodel/pure/packageableElements/function/Ownership.js';
import {
  V1_DeploymentOwner,
  type V1_Ownership,
} from '../../../../model/packageableElements/function/V1_Ownership.js';
import type { FunctionActivator } from '../../../../../../../../graph/metamodel/pure/packageableElements/function/FunctionActivator.js';

export const V1_buildSnowflakeAppDeploymentConfiguration = (
  element: V1_SnowflakeAppDeploymentConfiguration,
  context: V1_GraphBuilderContext,
): SnowflakeAppDeploymentConfiguration => {
  const metamodel = new SnowflakeAppDeploymentConfiguration();

  if (element.activationConnection) {
    const activationConnection = guaranteeType(
      V1_buildConnection(element.activationConnection, context),
      ConnectionPointer,
    );

    metamodel.activationConnection = activationConnection;
  }
  return metamodel;
};

export const V1_buildDeploymentOwnership = (
  ownership: V1_Ownership,
  functionActivator: FunctionActivator,
): Ownership => {
  if (ownership instanceof V1_DeploymentOwner) {
    return new DeploymentOwner(ownership.id, functionActivator);
  }
  throw new UnsupportedOperationError();
};
