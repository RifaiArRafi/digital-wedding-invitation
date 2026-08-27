import { ref, onMounted } from 'vue'
import type { GuestInfo } from '../types/wedding'

export function useGuest() {
  const guest = ref<GuestInfo>({
    name: 'Honored Guest',
    seats: 2,
    table: 'Table 4',
    personalizedMessage: 'We would be deeply honored by your presence on our special day.',
    isVip: false,
  })

  const hasCustomGuest = ref(false)
  const isEnvelopeOpen = ref(false)

  const parseGuestFromUrl = () => {
    if (typeof window === 'undefined') return

    const params = new URLSearchParams(window.location.search)
    
    // Check parameters in order of preference
    const nameParam = params.get('to') || params.get('guest') || params.get('name') || params.get('p') || params.get('u')
    const seatsParam = params.get('seats') || params.get('pax') || params.get('qty')
    const tableParam = params.get('table')
    const vipParam = params.get('vip')

    if (nameParam && nameParam.trim() !== '') {
      hasCustomGuest.value = true
      // Clean up plus signs and underscores if present
      const cleanName = decodeURIComponent(nameParam.replace(/\+/g, ' ')).trim()
      guest.value.name = cleanName
    }

    if (seatsParam && !isNaN(parseInt(seatsParam, 10))) {
      guest.value.seats = Math.max(1, parseInt(seatsParam, 10))
    }

    if (tableParam) {
      guest.value.table = decodeURIComponent(tableParam.replace(/\+/g, ' ')).trim()
    }

    if (vipParam === '1' || vipParam === 'true') {
      guest.value.isVip = true
    }
  }

  const openEnvelope = () => {
    isEnvelopeOpen.value = true
  }

  const closeEnvelope = () => {
    isEnvelopeOpen.value = false
  }

  onMounted(() => {
    parseGuestFromUrl()
    // Auto-open invitation envelope on landing if guest specified
    if (hasCustomGuest.value) {
      isEnvelopeOpen.value = true
    }
  })

  return {
    guest,
    hasCustomGuest,
    isEnvelopeOpen,
    openEnvelope,
    closeEnvelope,
  }
}
