// @flow
import React from 'react'
import { Icon, Button } from 'semantic-ui-react'
import styled from 'styled-components'

import type { Node } from 'react'

type Props = {
  children: Node,
  onPlus: () => any,
  onMinus: () => any,
  plusTip?: string,
  minusTip?: string,
}

export const Incrementer = ({
  children,
  plusTip,
  minusTip,
  onPlus,
  onMinus,
}: Props) => (
  <IncrementerEl>
    <Button icon onClick={onMinus} title={minusTip}>
      <Icon name="minus" />
    </Button>
    <span>{children}</span>
    <Button icon onClick={onPlus} title={plusTip}>
      <Icon name="plus" />
    </Button>
  </IncrementerEl>
)

const IncrementerEl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  margin: 0.3rem 0;
`
